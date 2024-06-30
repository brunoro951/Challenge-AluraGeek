document.addEventListener('DOMContentLoaded', () => {
    async function obtenerVideos() {
        try {
            const respuesta = await fetch('http://localhost:3001/videos');
            if (!respuesta.ok) {
                throw new Error('Error en la solicitud: ' + respuesta.statusText);
            }
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    function crearCard(video) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = video.img;
        card.appendChild(img);

        const titulo = document.createElement('h2');
        titulo.textContent = video.titulo;
        card.appendChild(titulo);

        const descripcion = document.createElement('p');
        descripcion.textContent = video.descripcion;
        card.appendChild(descripcion);

        const precio = document.createElement('p');
        precio.textContent = `Precio: ${video.precio}`;
        card.appendChild(precio);

 
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            card.remove();
        });
        card.appendChild(botonEliminar);

        return card;
    }

    function mostrarVideos(videos) {
        const contenedor = document.getElementById('contenedor-cards');
        contenedor.innerHTML = ''; // Limpiar contenedor

        if (!videos) {
            console.log('No se pudieron obtener los videos.');
            return;
        }

        videos.forEach(video => {
            const card = crearCard(video);
            contenedor.appendChild(card);
        });
    }

    async function iniciar() {
        const videos = await obtenerVideos();
        mostrarVideos(videos);
    }

    // Llamada a la función principal
    iniciar();

    const formSubmitButton = document.getElementById('submitButton');
    const formClearButton = document.getElementById('clearButton');

    formSubmitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('inputName');
        const priceInput = document.getElementById('inputPrice');
        const imageInput = document.getElementById('inputImage');

        if (!nameInput || !priceInput || !imageInput) {
            console.error('Uno o más elementos del formulario no se encontraron.');
            return;
        }

        if (nameInput.value.trim() === '' || priceInput.value.trim() === '' || imageInput.value.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const nuevoVideo = {
            titulo: nameInput.value,
            img: imageInput.value,
            descripcion: 'Descripción generada por el usuario',
            precio: priceInput.value
        };

        const card = crearCard(nuevoVideo);
        const contenedor = document.getElementById('contenedor-cards');
        contenedor.appendChild(card);

        // Limpiar el formulario
        nameInput.value = '';
        priceInput.value = '';
        imageInput.value = '';
    });

    formClearButton.addEventListener('click', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('inputName');
        const priceInput = document.getElementById('inputPrice');
        const imageInput = document.getElementById('inputImage');

        if (!nameInput || !priceInput || !imageInput) {
            console.error('Uno o más elementos del formulario no se encontraron.');
            return;
        }

        nameInput.value = '';
        priceInput.value = '';
        imageInput.value = '';
    });
});
