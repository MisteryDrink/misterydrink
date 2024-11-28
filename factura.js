document.getElementById('facturaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los datos del formulario (aunque no los usamos en este caso)
    const nombre = document.getElementById('nombre').value;
    const rfc = document.getElementById('rfc').value;
    const direccion = document.getElementById('direccion').value;
    const correo = document.getElementById('correo').value;
    const monto = document.getElementById('monto').value;

    // Mostrar el mensaje de confirmación
    const mensaje = `El archivo fue enviado a su correo: ${correo}`;

    // Mostrar el mensaje
    document.getElementById('mensajeFactura').textContent = mensaje;

    // Mostrar la sección de "Factura Generada"
    document.getElementById('respuestaFactura').style.display = 'block';

    // Opcional: Enviar los datos al servidor para generar una factura electrónica real
    // Aquí podrías hacer una solicitud AJAX a tu backend para procesar la factura
});
