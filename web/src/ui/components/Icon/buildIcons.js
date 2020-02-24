const fs = require('fs');
const path = require('path');

const SVGO = require('svgo');
const prettier = require('prettier');

const svgDir = path.join(__dirname, 'svg');
const iconsDir = path.join(__dirname, 'icons');

const templateFile = './iconTemplate.txt';

const pascalCase = string => string.charAt(0).toUpperCase() + string.substr(1);

const svgo = new SVGO({
  plugins: [
    { removeViewBox: false },
    { removeDimensions: true },
    {
      removeAttrs: { attrs: '(xmlns)' },
    },
  ],
});

function clearOldIcons() {
  fs.readdirSync(iconsDir)
    .filter(file => /\.js$/.test(file))
    .map(file => path.join(iconsDir, file))
    .forEach(filePath => fs.unlinkSync(filePath));
}

function reactify(svgString) {
  return svgString
    .replace('<svg ', '<Icon {...props} ')
    .replace('</svg>', '</Icon>');
}

async function generateIcons() {
  const iconTemplate = fs.readFileSync(
    path.resolve(__dirname, templateFile),
    'utf8',
  );

  const svgs = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));

  const prettierOptions = (await prettier.resolveConfig(__dirname)) || {};
  const iconExports = [];

  svgs.forEach(async svgFilename => {
    const componentName = pascalCase(path.parse(svgFilename).name);
    iconExports.push(`export { ${componentName} } from './${componentName}';`);

    const svgContent = fs.readFileSync(
      path.resolve(svgDir, svgFilename),
      'utf8',
    );

    const data = await svgo
      .optimize(svgContent)
      .then(result => result.data)
      .then(result =>
        iconTemplate
          .replace(new RegExp('%%ICON_NAME%%', 'g'), componentName)
          .replace('%%ICON_SVG%%', reactify(result)),
      );

    fs.writeFileSync(
      path.resolve(iconsDir, `./${componentName}.js`),
      prettier.format(data, {
        ...prettierOptions,
        parser: 'babel',
      }),
    );
  });

  fs.writeFileSync(
    path.resolve(iconsDir, './index.js'),
    `${iconExports.join('\n\n')}\n`,
  );

  // eslint-disable-next-line no-console
  console.log(`Wrote ${svgs.length} icon(s)`);
}

clearOldIcons();

generateIcons();
