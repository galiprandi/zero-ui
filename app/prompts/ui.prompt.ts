export const ui = `
Guia para renderizar mensajes en el chat:

Card con detalles de un producto:
<div class="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-lg border border-gray-200 dark:border-gray-700">
  <img src="[URL_DE_LA_IMAGEN]" alt="[NOMBRE_DEL_PRODUCTO]" class="w-20 h-20 object-cover rounded-md mr-4">
  <div class="flex-1">
    <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">[NOMBRE_DEL_PRODUCTO]</h2>
    <p class="text-sm text-gray-600 dark:text-gray-400">Categoría: [CATEGORÍA]</p>
    <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">[DESCRIPCIÓN_DETALLADA]</p>
    <p class="text-md font-semibold text-green-600 dark:text-green-400 mt-2">Precio: $[PRECIO]</p>
    <p class="text-xs text-gray-500 dark:text-gray-500">EAN: [CÓDIGO_EAN]</p>
  </div>
</div>

`;
