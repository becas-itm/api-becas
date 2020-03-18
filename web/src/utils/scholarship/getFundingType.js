export function getFundingType(type) {
  switch (type) {
    case 'COMPLETE':
      return 'Completo';

    case 'PARTIAL':
      return 'Parcial';

    default:
      return 'No disponible';
  }
}
