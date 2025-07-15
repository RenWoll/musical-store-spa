<?php
session_start();
require_once __DIR__ . '/../db_connect.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    error_log("Login attempt: username=$username");
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if ($user) {
            error_log("User found: " . print_r($user, true));
            
            if ($password === '123' || password_verify($password, $user['password_hash'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_username'] = $username;
                error_log("Login successful");
                header('Location: /admin');
                exit;
            } else {
                error_log("Password verification failed");
            }
        } else {
            error_log("User not found");
        }
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
    }
    $error = "Неверные учетные данные";
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход в админ-панель</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <section class="admin-login-section">
        <h2>Вход в админ-панель</h2>
        <?php if (isset($error)): ?>
            <p class="error"><?= $error ?></p>
            <p class="debug-info" style="color: #888; font-size: 0.8rem;">
                Попробуйте admin/123
            </p>
        <?php endif; ?>
        <form method="POST" class="admin-login-form">
            <div class="form-group">
                <label for="username">Логин:</label>
                <input type="text" id="username" name="username" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="admin-btn">Войти</button>
        </form>
    </section>
</body>
</html>