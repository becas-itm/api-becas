import React from 'react';
import { Link } from 'react-router-dom';

import { useToggle } from 'utils/hooks';
import AppLogo from 'ui/components/AppLogo';
import { Menu, Github } from 'ui/components/Icon';
import IconButton from 'ui/components/IconButton';

import { SearchBar } from './SearchBar';
import { ReactComponent as ImgHero } from './imgResearching.svg';
import './HomePage.scss';

export default function HomePage() {
  const [showMenu, toggleMenu] = useToggle();
  return (
    <div className="pHome">
      <header className="pHome__header pHome__container">
        <AppLogo />
        <div>
          <nav className="pHome__menuLinks">
            <Link
              to="/buscar"
              className="p-4 rounded hover:underline focus:underline"
            >
              Buscar
            </Link>
            <Link
              to="/terminos"
              className="p-4 mx-4 rounded hover:underline focus:underline"
            >
              Términos
            </Link>
            <Link
              to="#"
              className="p-4 rounded hover:underline focus:underline"
            >
              Nosotros
            </Link>
          </nav>
          <div className="pHome__menuBtn">
            <IconButton onClick={toggleMenu} large icon={Menu}>
              Menú
            </IconButton>
          </div>
        </div>
      </header>

      {showMenu && (
        <nav className="bg-red mt-2 flex flex-col border-b">
          <Link
            to="/buscar"
            className="p-4 rounded hover:underline focus:underline"
          >
            Buscar
          </Link>
          <Link
            to="/terminos"
            className="p-4 rounded hover:underline focus:underline"
          >
            Términos
          </Link>
          <Link to="#" className="p-4 rounded hover:underline focus:underline">
            Nosotros
          </Link>
        </nav>
      )}

      <div className="pHome__container h-full flex-1">
        <main className="pHome__main">
          <div className="pHome__content">
            <h1 className="pHome__title">
              Encuentra nuevas oportunidades en el exterior
            </h1>

            <SearchBar />

            <div className="pHome__writeUs">
              ¿Conoces alguna beca?{' '}
              <Link to="#" className="underline py-4">
                ¡Compártela!
              </Link>
            </div>
          </div>

          <ImgHero aria-hidden className="pHome__image w-full h-full" />
        </main>
      </div>

      <footer className="pHome__footer pHome__container">
        <a
          title="Ver becas en GitHub"
          aria-label="Ver becas en GitHub"
          href="https://github.com/orgs/becas-itm"
          className="pHome__gitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </footer>
    </div>
  );
}
