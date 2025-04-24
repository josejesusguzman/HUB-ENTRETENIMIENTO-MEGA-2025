# Migración a Angular 18

Tomaremos como ejemplo una aplicación de películas que muestra una lista de filmes obtenidos de la API de TMDb, permite ver detalles de cada película y gestionar una lista de favoritos. Se cubrirán los pasos de instalación, configuración de Angular Material, creación de la estructura del proyecto en Angular, componentes, rutas, servicios, e implementaremos funcionalidades equivalentes a las del proyecto original pero aprovechando las ventajas de Angular (como data binding y enrutamiento).

# Índice de Contenidos
- Instalación de Angular CLI y Creación del Proyecto
- Configuración de Tailwind CSS
- Estructura del Proyecto Angular
- Creación de Componentes, Rutas y Servicios
    - MoviesListComponent
    - MovieDetailComponent
    - FavoritesComponent
    - MovieService: Consumiendo la API de TMDb
    - FavoriteService: Manejo de Favoritos con LocalStorage
    - Navegación con Angular Router y ActivatedRoute
- Data Binding en Angular vs Manipulación DOM Manual
- Uso de Angular Material en la Interfaz
- Referencias


## Instalación de Angular CLI y Creación del Proyecto

1. **Instalar Angular CLI**: Si aún no lo tienes, instala la herramienta de línea de comandos de Angular de forma global. Necesitas tener Node.js y npm instalados. Ejecuta en la terminal:

```bash
npm install -g @angular/cli
```

Este comando descarga e instala Angular CLI globalmente en tu sistema


2. **Crear un nuevo proyecto Angular**: Usa Angular CLI para generar la base del nuevo proyecto. En la terminal, ve al directorio donde deseas crear el proyecto y ejecuta:

```bash
ng new hub-de-entretenimiento
```
*(Reemplaza "hub-de-entretenimiento" con el nombre de tu proyecto).*


Angular CLI te pedirá algunos datos:
- Si quieres añadir routing (enrutamiento). Escribe "Yes" (Sí) para que se genere un módulo de rutas inicial.
- Selecciona el formato de hoja de estilos que prefieras (CSS, SCSS, etc.).

El CLI creará un nuevo workspace y una aplicación Angular dentro de una carpeta con el nombre dado, instalando todas las dependencias necesarias​. Este proceso puede tardar unos minutos. Una vez terminado, entra al directorio del proyecto:

```bash
cd hub-de-entretenimiento
```

3. **Arrancar la aplicación en modo desarrollo**: Asegúrate de situarte dentro del directorio del proyecto y ejecuta:

```bash
ng serve --open
```

Este comando compila la aplicación y levanta un servidor de desarrollo local. La opción --open (o -o) automáticamente abre tu navegador en http://localhost:4200/ para mostrar la aplicación funcionando​. Angular CLI queda vigilando los archivos, de modo que ante cualquier cambio recompilará y recargará la página automáticamente​. En este punto deberías ver la aplicación Angular de bienvenida funcionando.

