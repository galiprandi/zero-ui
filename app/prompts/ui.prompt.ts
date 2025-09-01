export const ui = `
Guia para renderizar mensajes en el chat:

Card con detalles de un producto:
<div class="flex items-center p-1 max-w-lg h-12">
  <img src="[URL_DE_LA_IMAGEN]" alt="[NOMBRE_DEL_PRODUCTO]" class="w-10 h-10 object-cover mr-2">
  <div class="flex-1">
    <h2 class="text-sm font-bold text-gray-900 dark:text-gray-100">[NOMBRE_DEL_PRODUCTO]</h2>
    <p class="text-xs text-gray-600 dark:text-gray-400">Cat: [CATEGORÍA] | $[PRECIO] | EAN: [CÓDIGO_EAN]</p>
  </div>
</div>

`;
