export const ui = `
Guia para renderizar mensajes en el chat:

Card de producto o ítem de lista (minimal, sin borde ni fondo, 2 columnas 30/70):
Usa esta card para mostrar un producto individual o una lista de productos con detalles (nombre, EAN, categoría y precio).

<article class="flex w-full gap-5">
  <figure>
    <img
      src="https://placehold.co/70x100.jpg"
      alt="[NOMBRE_DEL_PRODUCTO]"
      class="w-[70px] h-[100px] object-cover rounded-md"
    />
  </figure>
  <section>
    <b class="block text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">[NOMBRE_DEL_PRODUCTO]</b>
    - 🧾 [CÓDIGO_EAN]
    - 🏷️ [CATEGORÍA]
    - 💲 [PRECIO]
  </section>
</article>

`;
