<?php
session_start();
require_once realpath(__DIR__ . '/../db_connect.php');

if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: /admin-login');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_product'])) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $image_url = $_POST['image_url'];

    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $description, $price, $image_url]);
}

if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
}

$stmt = $pdo->query("SELECT * FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админ-панель | Harmonic</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <nav>
            <h1>Harmonic Admin</h1>
            <ul>
                <li><a href="/" data-link>На сайт</a></li>
                <li><a href="/admin?logout=1">Выйти</a></li>
            </ul>
        </nav>
    </header>

    <main class="admin-main">
        <section class="admin-panel">
            <h2>Добавить новый товар</h2>
            <form method="POST" class="product-form">
                <div class="form-group">
                    <label for="name">Название:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="description">Описание:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Цена ($):</label>
                    <input type="number" id="price" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="image_url">URL изображения:</label>
                    <input type="url" id="image_url" name="image_url" required>
                </div>
                <button type="submit" name="add_product" class="admin-btn">Добавить товар</button>
            </form>

            <h2>Список товаров</h2>
            <div class="product-list">
                <?php foreach ($products as $product): ?>
                <div class="admin-product-card">
                    <img src="<?= htmlspecialchars($product['image_url']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
                    <div class="product-info">
                        <h3><?= htmlspecialchars($product['name']) ?></h3>
                        <p><?= htmlspecialchars($product['description']) ?></p>
                        <p class="price">$<?= htmlspecialchars($product['price']) ?></p>
                    </div>
                    <a href="/admin?delete=<?= $product['id'] ?>" class="delete-btn" onclick="return confirm('Удалить этот товар?')">Удалить</a>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
    </main>

    <script src="../js/admin.js"></script>
</body>
</html>