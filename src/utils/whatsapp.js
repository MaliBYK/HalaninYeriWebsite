export const WHATSAPP_NUMBER = '905078508806';

export function openWhatsAppReservation(message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
}
