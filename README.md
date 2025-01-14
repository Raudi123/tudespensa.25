# Tu Tienda de Alimentos - Aplicación Web

## Configuración del Proyecto

1. Instala Visual Studio Code
2. Instala la extensión "Live Server" en VS Code
   - Abre VS Code
   - Ve a la pestaña de extensiones (Ctrl+Shift+X)
   - Busca "Live Server"
   - Instala la extensión de Ritwick Dey

3. Estructura de carpetas:

tu-tienda-de-alimentos/
│
├── index.html
├── styles/
│   └── main.css
│
├── js/
│   ├── config.js
│   ├── app.js
│   │
│   ├── components/
│   │   ├── Header.js
│   │   ├── ProductCard.js
│   │   ├── ProductList.js
│   │   ├── Cart.js
│   │   ├── StoreMenu.js
│   │   ├── StoreInfo.js
│   │   ├── AuthModal.js
│   │   └── Policies.js
│   │
│   └── utils/
│       └── cartUtils.js
│
└── README.md


4. Cómo ejecutar el proyecto:
   - Abre la carpeta del proyecto en VS Code
   - Click derecho en `index.html`
   - Selecciona "Open with Live Server"
   - El proyecto se abrirá en tu navegador predeterminado

## Notas Importantes

- No necesitas un entorno de desarrollo complejo
- No requiere instalación de Node.js ni npm
- No necesita proceso de build
- Funciona directamente en el navegador
- Los cambios se reflejan automáticamente al guardar los archivos

## Solución de Problemas

Si los componentes no se cargan:
1. Verifica que todos los archivos estén en las carpetas correctas
2. Asegúrate de que los nombres de archivo coincidan exactamente
3. Comprueba que Live Server esté funcionando (icono en la barra de estado de VS Code)
4. Limpia el caché del navegador

## Estructura de Archivos

Cada archivo JavaScript debe estar en su ubicación correcta:

- Componentes en `js/components/`
- Utilidades en `js/utils/`
- Configuración en `js/config.js`
- Aplicación principal en `js/app.js`
- Estilos en `styles/main.css`

## Desarrollo

Para desarrollar:
1. Abre el proyecto en VS Code
2. Realiza cambios en los archivos
3. Guarda los cambios
4. Los cambios se reflejarán automáticamente en el navegador

No necesitas compilar ni ejecutar comandos adicionales.
"# tudespensa.25" 
