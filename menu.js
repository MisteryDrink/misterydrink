document.addEventListener('DOMContentLoaded', () => {
    const imgCarrito = document.querySelector('#img-carrito');
    const carrito = document.querySelector('#carrito');
    const carritoTabla = document.querySelector('#lista-carrito tbody');
    const botonesAgregarCarrito = document.querySelectorAll('.add-to-cart');

    const productosCarrito = [];

    imgCarrito.addEventListener('click', () => {
        if (carrito.style.display === 'block') {
            carrito.style.display = 'none';
        } else {
            carrito.style.display = 'block';
        }
    });

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const nombreProducto = boton.getAttribute('data-name');
            const precioProducto = boton.getAttribute('data-price');
            const imagenProducto = boton.getAttribute('data-image');

            const productoExistente = productosCarrito.find(producto => producto.nombre === nombreProducto);

            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                productosCarrito.push({
                    nombre: nombreProducto,
                    precio: parseFloat(precioProducto),
                    imagen: imagenProducto,
                    cantidad: 1
                });
            }
            actualizarCarrito();
        });
    });

    function actualizarCarrito() {
        carritoTabla.innerHTML = '';

        productosCarrito.forEach(producto => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td><img src="${producto.imagen}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td><button class="remove-from-cart" data-name="${producto.nombre}">Eliminar</button></td>
            `;

            carritoTabla.appendChild(fila);
        });

        const botonesEliminar = document.querySelectorAll('.remove-from-cart');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const nombreProducto = boton.getAttribute('data-name');
                const productoIndex = productosCarrito.findIndex(producto => producto.nombre === nombreProducto);

                if (productoIndex !== -1) {
                    productosCarrito.splice(productoIndex, 1);
                    actualizarCarrito();
                }
            });
        });
    }

    const botonVaciarCarrito = document.querySelector('#vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        productosCarrito.length = 0;
        actualizarCarrito();
    });
});
