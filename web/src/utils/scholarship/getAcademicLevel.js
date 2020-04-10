export function getAcademicLevel(level) {
  switch (level) {
    case 'UNDERGRADUATE':
      return 'Pregrado';

    case 'POSTGRADUATE':
      return 'Posgrado';

    case 'BOTH':
      return 'Pregrado y posgrado';

    default:
      return 'Otros';
  }
}
