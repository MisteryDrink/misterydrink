// Función para mostrar los productos del carrito en la página de checkout
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.getElementById('checkout-items');
    const totalElement = document.getElementById('total');
    
    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No tienes productos en el carrito.</td></tr>';
        totalElement.innerHTML = 'Total: $0.00';
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
        `;
        tbody.appendChild(tr);

        // Acumulamos el precio total
        total += producto.precio;
    });

    // Mostrar el total
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Función para finalizar la compra
document.getElementById('finalizar-compra').addEventListener('click', function() {
    // Vaciar el carrito
    localStorage.removeItem('carrito');
    
    // Mostrar el mensaje de confirmación de compra
    document.getElementById('confirmacion-compra').classList.remove('hidden');
    
    // Ocultar la tabla de productos y el botón de finalizar compra
    document.getElementById('tabla-checkout').style.display = 'none';
    document.getElementById('finalizar-compra').style.display = 'none';
});

// Llamar a la función para mostrar los productos cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
