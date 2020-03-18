export function getAcademicLevel(level) {
  switch (level) {
    case 'UNDERGRADUATE':
      return 'Pregrado';

    case 'POSTGRADUATE':
      return 'Posgrado';

    default:
      return 'Otros';
  }
}
