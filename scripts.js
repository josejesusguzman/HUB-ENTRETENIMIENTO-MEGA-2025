document.addEventListener('DOMContentLoaded', () => {

    const peliculas = [
        {
            id: 1,
            titulo: "Deadpool",
            imagen: "assets/deadpool.webp",
            descripcion: "Un antihéroe irreverente"
        },
        {
            id: 2,
            titulo: "Invencible",
            imagen: "assets/invencible.webp",
            descripcion: "Héroe que siempre es vencido"
        },
        {
            id: 3,
            titulo: "Spoderman",
            imagen: "assets/spoderman.webp",
            descripcion: "El hombre que araña"
        }

    ];

    const esCatalogo = window.location.pathname.includes("index.html")

    if (esCatalogo) {
        loadMovies(peliculas);
    }

    function loadMovies(lista) {
        const contenedor = document.querySelector("#listaPeliculas");
        if (!contenedor) return;

        contenedor.innerHTML = "";

        lista.forEach(pelicula => {
            const card = createMovieCard(pelicula);
            contenedor.appendChild(card);
        });
    }

    function createMovieCard(pelicula) {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card mb-3">
                    <img src="${pelicula.imagen}" class="card-img-top img-fluid" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.titulo}</h5>
                        <p class="card-text">${pelicula.descripcion}</p>
                        <a href="detalle.html" class="btn btn-primary">Ver</a>
                        <button class="btn btn-danger btn-ocultar">Ocultar</button>
                    </div>
                </div>
        
        `;
        return col;
    }


});


