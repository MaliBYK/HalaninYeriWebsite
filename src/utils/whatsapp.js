export const WHATSAPP_NUMBER = '905078508806';

export function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppReservation(message) {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}
