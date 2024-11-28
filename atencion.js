document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la recarga de la página

    const formData = new FormData(this);

    fetch('https://formspree.io/f/xjkvgkzb', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        const messageElement = document.getElementById('responseMessage');
        messageElement.style.display = 'block';
        
        if (response.ok) {
            messageElement.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
            document.getElementById('contactForm').reset();
        } else {
            messageElement.textContent = 'Ocurrió un error. Inténtalo nuevamente más tarde.';
        }
    })
    .catch(error => {
        const messageElement = document.getElementById('responseMessage');
        messageElement.style.display = 'block';
        messageElement.textContent = 'Ocurrió un error. Inténtalo nuevamente más tarde.';
        console.error('Error:', error);
    });
});