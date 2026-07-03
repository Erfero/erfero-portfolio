/**
 * Capture d'écran live gratuite (thum.io, sans clé API) pour les boutiques
 * dont l'accès direct en iframe est bloqué par Shopify (X-Frame-Options: DENY
 * sur 100% des storefronts testés). Le screenshot est régénéré par thum.io
 * à intervalle régulier, donc reste globalement à jour.
 */
export function getScreenshotUrl(url: string, width = 900, cropHeight = 1400) {
  return `https://image.thum.io/get/width/${width}/crop/${cropHeight}/noanimate/${url}`;
}
