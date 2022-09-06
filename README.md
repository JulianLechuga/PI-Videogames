## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

Adicionalmente, es necesaria la presencia de una base de datos llamada `videogames`, idealmente de PostgreSQL

El contenido de `client` fue creado usando: Create React App.

## Enunciado

La idea general fue la creación de una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Agregar nuevos videojuegos

### Solo se utilizó CSS puro para el diseño de la página

### Únicos Endpoints/Flags utilizados

- GET <https://api.rawg.io/api/games>
- GET <https://api.rawg.io/api/games?search={game}>
- GET <https://api.rawg.io/api/genres>
- GET <https://api.rawg.io/api/games/{id}>

#### Tecnologías Utilizadas

- [✔] React
- [✔] Redux
- [✔] Express
- [✔] Sequelize - Postgres

## Frontend / Client

__Landing page / Pagina inicial__:

- [✔] Imagen de fondo representativa al proyecto
- [✔] Botón para ingresar al home (`Ruta principal`)

__Main page / Pagina principal__:

- [✔] Input de búsqueda para encontrar videojuegos por nombre
- [✔] Área donde se observa el listado de videojuegos, mostrando su:
    - Imagen
    - Nombre
    - Géneros
- [✔] Botones/Opciones para filtrar por género y por videojuego existente o agregado por los usuarios
- [✔] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- [✔] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

__Ruta de detalle de videojuego__:

- [✔] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [✔] Descripción
- [✔] Fecha de lanzamiento
- [✔] Rating
- [✔] Plataformas

__Ruta de creación de videojuegos__:

- [✔] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [✔] Posibilidad de seleccionar/agregar varios géneros
- [✔] Posibilidad de seleccionar/agregar varias plataformas
- [✔] Botón/Opción para crear un nuevo videojuego

## Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [✔] Videojuego con las siguientes propiedades:
  - ID: Con un Id único para los juegos creados por los usuarios (que no puede colisionar con los de la API)
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
  - Plataformas
- [✔] Genero con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos, ya que un videojuego puede pertenecer a varios géneros en simultaneo y, a su vez, un género puede contener múltiples videojuegos distintos. Un ejemplo conocido sería el juego `Counter Strike` pertenece a los géneros Shooter y Action al mismo tiempo. Pero a su vez existen otros videojuegos considerados como Shooter o como Action.

## Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [✔] __GET /videogames__:
  - Obtiene un listado de los videojuegos.
  - Devuele solo los datos necesarios para la ruta / página principal.
- [✔] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter.
  - Si no existe ningún videojuego muestra un mensaje adecuado.
- [✔] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular.
  - Trae solo los datos pedidos en la ruta de detalle de videojuego.
  - Incluye los géneros asociados.
- [✔] __POST /videogames__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body.
  - Crea un videojuego en la base de datos, relacionado a sus géneros.
- [✔] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia trae los géneros desde rawg, los guarda en la base de datos y luego la aplicación se maneja con datos locales.

## Testing

- [✔] Se testean los componentes del front.
- [✔] Se testean las rutas del back, con sus funciones y respuestas respectivas.
- [✔] Se testea la base de datos, la creación de modelos y las relaciones entre los mismos.
