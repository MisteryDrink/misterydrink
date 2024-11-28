document.addEventListener('DOMContentLoaded', function() {
    const chatbotBubble = document.getElementById('chatbot-bubble');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeButton = document.querySelector('.close-button');

    // Función para abrir el chat
    chatbotBubble.addEventListener('click', openChat);
    // Función para cerrar el chat
    closeButton.addEventListener('click', closeChat);

    function openChat() {
        chatbotWindow.style.display = 'block';  // Muestra el chat
    }

    function closeChat() {
        chatbotWindow.style.display = 'none';  // Oculta el chat
    }

    // Función para agregar mensajes al chat
    function appendMessage(sender, message) {
        const chatbox = document.getElementById('chatbox');
        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        messageElement.innerHTML = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Función para obtener respuesta del bot según la entrada del usuario
    function getBotResponse(input) {
        let response = '';
        input = input.toLowerCase();

        if (input.includes('caliente') || input.includes('fría')) {
            if (input.includes('caliente')) {
                response = 'Te recomiendo nuestra bebida caliente "Sueño navideño". <a href="comprar.html?s=sueno-navidemo">Compra aquí</a>';
                showRecommendations(response);
            } else if (input.includes('fría')) {
                response = 'Te recomiendo nuestra bebida fría "Ofrenda del Sabor". <a href="comprar.html?s=ofrenda-del-sabor">Compra aquí</a>';
                showRecommendations(response);
            }
        } else if (input.includes('clima')) {
            showCityInput();  // Muestra la entrada de ciudad para obtener el clima
        } else {
            response = 'No estoy seguro de lo que quieres decir. ¿Prefieres una bebida caliente o fría?';
            appendMessage('bot', response);
            showInitialOptions();  // Muestra las opciones iniciales
        }
    }

    // Función para mostrar las recomendaciones solo en el chat
    function showRecommendations(message) {
        appendMessage('bot', message); // Solo muestra la recomendación en el chat
    }

    // Función para mostrar las opciones iniciales
    function showInitialOptions() {
        const recommendations = document.querySelector('.recommendations');
        recommendations.style.display = 'none';  // Esconde la sección de recomendaciones
        document.querySelector('.location-input').style.display = 'none';
        document.querySelector('.initial-options').style.display = 'block';
    }

    // Función para mostrar la entrada de ciudad
    function showCityInput() {
        document.querySelector('.initial-options').style.display = 'none';  // Esconde las opciones iniciales
        document.querySelector('.location-input').style.display = 'block';  // Muestra la entrada de ciudad
        appendMessage('bot', '¿En qué ciudad estás?');
    }

    // Función para enviar la ciudad y obtener el clima
    function submitCity() {
        const city = document.getElementById('user-city').value;
        if (city) {
            getWeather(city);  // Llama a la función para obtener el clima usando la API
        }
    }

    // Función para obtener datos del clima usando la API de OpenWeatherMap
    function getWeather(city) {
        const apiKey = '50f2ac509a357cfebff149ebe6b11e68';  // Reemplaza con tu clave de API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temperature = data.main.temp; // Temperatura en grados Celsius
                    let response = '';

                    if (temperature > 25) {
                        // Si la temperatura es mayor a 25°C, recomendar bebida fría
                        response = `Hace calor en ${city} (${temperature}°C). Te recomiendo una bebida fría "Trago del terror". <a href="comprar.html?s=brisa-fresca">Compra aquí</a>`;
                    } else if (temperature <= 25) {
                        // Si la temperatura es 25°C o menor, recomendar bebida caliente
                        response = `Hace frío o templado en ${city} (${temperature}°C). Te recomiendo una bebida caliente "Sueño navideño". <a href="comprar.html?s=abrazo-inverno">Compra aquí</a>`;
                    }
                    
                    appendMessage('bot', response);  // Muestra la recomendación en el chat
                    showInitialOptions();  // Regresa a las opciones iniciales
                } else {
                    appendMessage('bot', 'No pude obtener el clima para esa ciudad. ¿Puedes verificar el nombre?');
                }
            })
            .catch(error => {
                appendMessage('bot', 'Ocurrió un error al obtener el clima. Intenta nuevamente.');
            });
    }

    // Agregar evento a los botones de opciones iniciales
    const initialOptionButtons = document.querySelectorAll('.initial-options button');
    initialOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const option = this.innerText;
            getBotResponse(option);
        });
    });

    // Agregar evento al botón de enviar ciudad
    const submitCityButton = document.querySelector('.location-input button');
    submitCityButton.addEventListener('click', submitCity);
});
