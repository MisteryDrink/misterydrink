<?php

// Evitar cualquier salida antes de la redirección
ob_start();

// Datos de conexión a la base de datos
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$user = $_POST['username'];
$email = $_POST['email'];
$pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

// Verificar si el nombre de usuario ya existe usando consultas preparadas
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // El nombre de usuario ya existe
    echo "El nombre de usuario ya existe. Por favor, elige otro.";
} else {
    // El nombre de usuario es único, insertar los datos usando consultas preparadas
    $stmt = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $email, $pass);
    
    if ($stmt->execute()) {
        // Redirigir a menu.html después del registro exitoso
        header("Location: menu.html");
        exit(); // Asegurarse de que no se ejecute más código
    } else {
        echo "Error: " . $stmt->error;
    }
}

// Cerrar conexión
$conn->close();

// Evitar cualquier salida después de la redirección
ob_end_flush();
?>
