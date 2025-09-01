export const ui = `
Guia para renderizar mensajes en el chat:

Card de producto o ítem de lista (minimal, sin borde ni fondo, 2 columnas 30/70):
Usa esta card para mostrar un producto individual o una lista de productos con detalles (nombre, EAN, categoría y precio).
<article class="flex w-full items-center gap-2 my-0 my-[1em]">
  <figure class="m-0 shrink-0">
    <img
      src="https://placehold.co/56x72.jpg"
      alt="[NOMBRE_DEL_PRODUCTO]"
      class="w-[56px] h-[72px] object-cover rounded-md"
    />
  </figure>
  <section class="min-w-0 leading-none my-0 py-0">
    <b>[NOMBRE_DEL_PRODUCTO]</b>
    <div>🧾 [CÓDIGO_EAN]</div>
    <div>🏷️ [CATEGORÍA]</div>
    <b>﹩ [PRECIO]</b>
  </section>
</article>

`;
