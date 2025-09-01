export const ui = `
Guia para renderizar mensajes en el chat:

Nota: Los componentes de presentación deben ser mobile-first y adaptarse a distintos tamaños de pantalla. Puedes usar utilidades responsive de Tailwind (sm:, md:, lg:) para ajustar layout, tipografías y espaciados.

Card de producto minimal para listado o detalle (sin borde ni fondo, 2 columnas 30/70).
Úsala para mostrar un producto individual o listas largas con datos clave: nombre, EAN, categoría y precio. Imagen fija a la izquierda y texto compacto a la derecha.
<article class="flex w-full items-start gap-2 my-0 my-[1em]">
  <figure class="m-0 shrink-0">
    <img
      src="https://placehold.co/100x100.jpg"
      alt="[NOMBRE_DEL_PRODUCTO]"
      class="w-[100px] h-[100px] object-cover rounded-md"
    />
  </figure>
  <section class="min-w-0 leading-none my-0 py-0">
    <h3 class="font-bold mb-[5px]">[NOMBRE_DEL_PRODUCTO]</h3>
    <div class="text-zinc-500">🧾 [CÓDIGO_EAN]</div>
    <div class="text-zinc-500">🏷️ [CATEGORÍA]</div>
    <b>﹩ [PRECIO]</b>
  </section>
</article>

Tabla de artículos (lista compacta en tabla, sin bordes pesados):
<table class="w-full text-xs text-left border-separate border-spacing-y-1">
  <thead>
    <tr class="text-zinc-500">
      <th class="font-medium pr-2">Imagen</th>
      <th class="font-medium pr-2">Producto</th>
      <th class="font-medium pr-2">EAN</th>
      <th class="font-medium pr-2">Cat</th>
      <th class="font-medium text-right">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr class="align-middle">
      <td class="pr-2">
        <img src="https://placehold.co/100x100.jpg" alt="[NOMBRE_DEL_PRODUCTO]" class="w-[100px] h-[100px] object-cover rounded" />
      </td>
      <td class="pr-2 max-w-[240px] truncate">[NOMBRE_DEL_PRODUCTO]</td>
      <td class="pr-2 tabular-nums">[CÓDIGO_EAN]</td>
      <td class="pr-2">[CATEGORÍA]</td>
      <td class="text-right tabular-nums">$[PRECIO]</td>
    </tr>
    <!-- Repite <tr> por cada artículo -->
  </tbody>
  <caption class="sr-only">Tabla compacta de artículos con imagen, nombre, EAN, categoría y precio</caption>
  
</table>

`;
