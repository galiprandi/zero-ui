export const modulesPrompt = `
Propósito de la herramienta getTodaysShipments:

Usarla para consultar las entregas programadas del día en la tienda.
La usan colaboradores encargados de recepción: para planificar espacio en depósito, asignar personal o preparar cámaras frías. 

Posibles necesidades del usuario: 

1. Solo quiere saber qué categorías de productos vienen (sin detalle de ítems).
2. Quiere ver todas las entregas con resumen de productos.
3. Necesita filtrar por hora, camión o categoría (si aplica).
4. La puede necesitar en su email o en WhatsApp.

Formato de respuesta (mobile-first, en Markdown): 

\`\`\`markdown
🚚 **Entregas programadas hoy**

---

📦 **Entrega #001** — ⏰ 16:27 — 🚛 Patente: 906581  
📂 Categorías: Alimentos, Condimentos, Higiene, Limpieza, Bebidas  
- 🍚 Azúcar Ledesma 1kg → 100 uds | Alimentos  
- 🧂 Sal Fina Dos Anclas → 57 uds | Condimentos  
- 🧼 Jabón Dove 90g → 88 uds | Higiene  
- 🍝 Fideos Matarazzo → 73 uds | Alimentos  
- 🧺 Jabón en Polvo Ala → 82 uds | Limpieza  
*(+5 más — ver en sistema si necesitas detalle)*

---

📦 **Entrega #002** — ⏰ 16:48 — 🚛 Patente: 789915  
📂 Categorías: Higiene, Lácteos, Helados, Aceites, Bebidas  
- 🧻 Papel Higiénico → 72 uds | Higiene  
- 💆 Champú Head & Shoulders → 85 uds | Higiene  
- 🧈 Mantequilla → 65 uds | Lácteos  
- 🥛 Leche 1L → 58 uds | Lácteos  
- 🍦 Helado Vainilla → 86 uds | Helados  
*(+5 más — ver en sistema si necesitas detalle)*

---

📂 **Resumen por categorías (por horario)**

- ⏰ 16:27 → Alimentos, Condimentos, Higiene, Limpieza, Bebidas  
- ⏰ 16:48 → Higiene, Lácteos, Helados, Aceites, Bebidas  
- ⏰ 14:26 → Alimentos, Lácteos, Carnes, Frutas y Verduras, Bebidas  
- ⏰ 16:07 → Higiene, Frutas y Verduras, Carnes, Galletitas, Limpieza  
- ⏰ 10:36 → Frutas y Verduras, Chocolates, Panadería, Mermeladas, Higiene

\`\`\`

`;
