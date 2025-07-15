-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.0
-- Время создания: Июн 25 2025 г., 22:50
-- Версия сервера: 8.0.41
-- Версия PHP: 8.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- `harmonic_shop`
--

-- --------------------------------------------------------

--
-- `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2025-06-25 18:59:58');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Fender Stratocaster', 'Classical electric guitar', 799.00, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', '2025-06-25 18:59:58', '2025-06-25 18:59:58'),
(2, 'STAGG EVN X-4/4 WH', 'STAGG EVN X-4/4 WH electric violin with a solid frame, made in white. Its lacquered body is made of solid maple.', 199.00, 'https://www.muztorg.ru/files/ez8/40a/3jc/zs4/g8o/4s0/k8s/8cc/ez840a3jczs4g8o4s0k8s8cc.jpg', '2025-06-25 19:45:28', '2025-06-25 19:45:28'),
(3, 'VOX PATHFINDER 10', 'The VOX PATHFINDER 10 portable guitar combo amplifier with two VOX sound channels will give you a great time practicing at home and playing music in small rehearsal rooms.', 170.00, 'https://www.muztorg.ru/files/7wj/zsq/d09/z0g/c8c/cgw/owg/0ww/8/7wjzsqd09z0gc8ccgwowg0ww8.jpg', '2025-06-25 19:47:25', '2025-06-25 19:47:25'),
(4, 'SHURE SM58-LCE', 'SHURE SM58-The LCE is a high-quality dynamic microphone that delivers clear and natural sound in any environment.', 199.00, 'https://www.muztorg.ru/files/4l0/2ec/oyy/zs4/8s8/4os/okw/0sg/s/4l02ecoyyzs48s84osokw0sgs.jpeg', '2025-06-25 19:48:18', '2025-06-25 19:48:18'),
(5, 'ROCKDALE IC002.10', 'Rockdale is the perfect choice for aspiring musicians. Why, you may ask? Yes, because Rockdale adheres to the most affordable pricing policy, while relying on modern production facilities.', 11.00, 'https://www.muztorg.ru/files/3db/1yg/cws/ysk/g8o/o4o/0wo/k8k/s/3db1ygcwsyskg8oo4o0wok8ks.jpg', '2025-06-25 19:49:17', '2025-06-25 19:49:17');

--
-- `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
