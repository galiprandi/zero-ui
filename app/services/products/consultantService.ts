import { searchByEan } from "./searchByEan";

/**
 * Servicio principal: dado un EAN, devuelve datos de stock consolidados y recomendación.
 * Retorna null si el EAN no existe.
 */
export function getProductConsultingByEan(ean: string) {
  const base = searchByEan(ean);
  if (!base) return null;

  // Datos simulados para demo. En un futuro se reemplaza por integraciones reales (ERP/WMS/OMS).
  // Heurística simple y determinística en base al EAN para demo consistente.
  const seed = Number(ean.slice(-3));
  const storeQty = (seed % 60) + 5; // 5..64
  const warehouseQty = (seed % 120); // 0..119

  const neighbors = [
    { flag: "Jumbo", store: "5203", quantity: Math.max(0, storeQty - 2) },
    { flag: "Easy", store: "E504", quantity: Math.max(0, Math.floor(storeQty / 2)) },
    { flag: "Vea", store: "5504", quantity: (storeQty + 3) % 50 },
  ];

  // Última y próxima recepción (fechas relativas)
  const now = new Date();
  const last = new Date(now);
  last.setDate(now.getDate() - ((seed % 7) + 1));
  const next = new Date(now);
  next.setDate(now.getDate() + ((seed % 5) + 1));

  const lastArrival = { date: last.toISOString(), quantity: (seed % 80) + 10 };
  const nextArrival = warehouseQty > 0 ? { date: next.toISOString(), quantity: (warehouseQty % 90) + 5 } : null;

  const advice = (() => {
    if (storeQty === 0 && warehouseQty === 0 && neighbors.every(n => n.quantity === 0)) {
      return "Sin stock disponible en tienda, cercanas ni CD. Sugerir alternativa.";
    }
    if (storeQty < 10 && nextArrival && nextArrival.quantity > 0) {
      const when = new Date(nextArrival.date).toLocaleDateString();
      return `Stock bajo en tienda. Se repondrá aprox. el ${when} (CD: ${nextArrival.quantity} u).`;
    }
    if (storeQty < 10 && warehouseQty === 0) {
      return "Stock bajo en tienda y sin disponibilidad en CD. Consultar proveedores.";
    }
    return "Stock saludable. Mantener exhibición y rotación.";
  })();

  return {
    ean: base.ean,
    name: base.name,
    price: base.price,
    quantity: storeQty,
    inventory: {
      store: storeQty,
      warehouse: warehouseQty,
      neighborhoodStores: neighbors,
      lastArrival,
      nextArrival,
    },
    restockAdvice: advice,
  };
}
