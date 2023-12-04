// ...

//////////////* botones*//////////////////

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnBuscar = document.getElementById('btnBuscar');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

btnBuscar.addEventListener('click', () => {
    cargarPeliculas();
});
// Manejar la tecla "Enter" en el input
document.getElementById('inputBusqueda').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        cargarPeliculas();
    }
});

//////////////* Funciones *//////////////////

// Función principal para cargar películas
const cargarPeliculas = async () => {
    try {
        const inputBusqueda = document.getElementById('inputBusqueda');
        const busqueda = inputBusqueda.value.trim();

        // Construir la URL de la API según la búsqueda y la página
        let url;
        if (busqueda !== '') {
			url = `https://api.themoviedb.org/3/search/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&query=${busqueda}&page=${pagina}`;

        } else {
            url = `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-ES&page=${pagina}`;
        }

        const respuesta = await fetch(url);

        // Manejar la respuesta de la API
        if (respuesta.ok) {
            const peliculaData = await respuesta.json();
            mostrarPeliculas(peliculaData.results);
        } else {
            manejarErrorRespuesta(respuesta.status);
        }

    } catch (error) {
        console.error('Error al cargar películas:', error);
    }
}

// Función para mostrar las películas en el contenedor
const mostrarPeliculas = (peliculas) => {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = peliculas.map(pelicula => `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
        </div>
    `).join('');
}

// Función para manejar errores de respuesta de la API
const manejarErrorRespuesta = (statusCode) => {
    switch (statusCode) {
        case 401:
            console.error('Error 401: La clave de API es incorrecta.');
            break;
        case 404:
            console.error('Error 404: La película buscada no existe.');
            break;
        default:
            console.error(`Error inesperado: ${statusCode}`);
    }
}

// ...

cargarPeliculas();
