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
$pass = $_POST['password'];

// Preparar la consulta para obtener el usuario
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verificar la contraseña
    if (password_verify($pass, $row['password'])) {
        // Redirigir a menu.html después de una autenticación exitosa
        header("Location: menu.html");
        exit(); // Asegurarse de que no se ejecute más código
    } else {
        echo "Contraseña incorrecta. Por favor, intenta de nuevo.";
    }
} else {
    echo "Nombre de usuario no encontrado. Por favor, registra una cuenta.";
}

// Cerrar conexión
$conn->close();

// Evitar cualquier salida después de la redirección
ob_end_flush();
?>
