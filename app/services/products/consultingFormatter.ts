// If you don't have types, you can adapt this minimal shape to what's actually returned.
export interface ConsultingLike {
  ean: string;
  name: string;
  price: string;
  quantity?: number;
  inventory: {
    store: number;
    warehouse: number;
    neighborhoodStores?: Array<{ store: string; flag?: string; quantity: number }>;
    nextArrival?:
      | string
      | {
          date: string;
          quantity?: number;
          source?: string;
        };
  };
}

export function formatConsultingMessage(consulting: ConsultingLike): string {
  const lines: string[] = [];
  lines.push(`**${consulting.name}**`);
  lines.push(`    — EAN ${consulting.ean}`);
  lines.push(`    — Precio ${consulting.price}`);
  lines.push(`    - 📦 Disponibilidad:`);
  lines.push(`         - 🏪 En tienda: ${consulting.inventory.store} unidades; `);
  lines.push(`         - 🏢 CD: ${consulting.inventory.warehouse} unidades; `);

  const near = consulting.inventory.neighborhoodStores?.filter((s) => s.quantity > 0) ?? [];
  if (near.length) {
    const quantities = near.map((s) => s.quantity);
    const min = Math.min(...quantities);
    const max = Math.max(...quantities);
    if (Number.isFinite(min) && Number.isFinite(max)) {
      lines.push(`         - 🏬 Tiendas cercanas: entre ${min} y ${max} unidades; `);
    }
  }

  const na = consulting.inventory.nextArrival;
  if (na) {
    if (typeof na === "string") {
      lines.push(`    - 📅 Proxima recepción: ${na}`);
    } else {
      const qty = typeof na.quantity === "number" ? ` (${na.quantity} unidades)` : "";
      const src = "source" in na && na.source ? ` ${na.source}` : "";
      lines.push(`    - 📅 Proxima recepción: ${na.date}${qty}${src}`);
    }
  }

  return lines.join("\n");
}
