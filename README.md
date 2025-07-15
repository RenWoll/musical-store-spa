# 🎵 Music Instruments Online Store

A modern Single Page Application (SPA) for musical instruments e-commerce with comprehensive admin panel, security features, and SEO optimization. Built as a full-stack web application using vanilla technologies.

## 📖 Project Overview

This project demonstrates a complete e-commerce solution for musical instruments retail. The application features a responsive design, secure payment processing simulation, inventory management, and search engine optimization. Built without frameworks to showcase fundamental web development skills.

**Key Business Features:**
- Product catalog with filtering and search
- Shopping cart and checkout process
- User authentication and profiles
- Order management system
- Admin dashboard for inventory control
- Sales analytics and reporting

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** PHP 7.4+
- **Database:** MySQL 8.0
- **Development Server:** OpenServer
- **Architecture:** Single Page Application (SPA)

## ⚡ Features & Functionality

### Customer Features
- ✅ Interactive product catalog with categories
- ✅ Advanced search and filtering system
- ✅ Shopping cart with real-time updates
- ✅ User registration and authentication
- ✅ Order tracking and history
- ✅ Responsive design for all devices

### Admin Features
- ✅ Comprehensive admin dashboard
- ✅ Product and inventory management
- ✅ Order processing and status updates
- ✅ User management system
- ✅ Sales analytics and reports
- ✅ Content management capabilities

### Security Implementation
- ✅ SQL injection prevention (prepared statements)
- ✅ XSS protection and input validation
- ✅ CSRF token implementation
- ✅ Password hashing (bcrypt)
- ✅ Session management security
- ✅ Form validation (client & server-side)

### SEO Optimization
- ✅ Semantic HTML5 structure
- ✅ Meta tags optimization
- ✅ Robots.txt and sitemap.xml
- ✅ Custom 404 error page
- ✅ URL optimization
- ✅ Page loading performance optimization

## 🔧 Installation & Setup

Set up OpenServer:

Install OpenServer
Create virtual host pointing to project directory
Start Apache and MySQL services


Database Setup:
sqlmysql -u root -p < database/music_shop.sql

Configure database connection:

Edit php/config/database.php
Update database credentials


Access the application:

Open http://localhost/music-instruments-shop
Admin panel: http://localhost/music-instruments-shop/admin



🗄️ Database Schema
Main Tables:

products - Product information and specifications
categories - Product categorization
orders - Customer orders and status
order_items - Order details and quantities
users - Customer accounts and profiles
admin_users - Administrative accounts
cart_items - Shopping cart persistence

📊 Technical Highlights

Performance: Optimized database queries and lazy loading
Security: Multi-layer security implementation
Scalability: Modular PHP architecture
UX/UI: Intuitive interface with smooth animations
SEO: Search engine friendly structure
Maintenance: Clean, documented codebase

🎯 Learning Outcomes
This project demonstrates proficiency in:

Full-stack web development
Database design and optimization
Security best practices implementation
SEO and web performance optimization
Modern JavaScript and DOM manipulation
PHP backend development
User experience design principles

🔐 Security Measures

Input sanitization and validation
SQL injection prevention
Cross-site scripting (XSS) protection
Cross-site request forgery (CSRF) protection
Secure password storage
Session hijacking prevention

📱 Browser Compatibility

Chrome 70+
Firefox 65+
Safari 12+
Edge 44+
Mobile browsers (iOS Safari, Chrome Mobile)

👨‍💻 Author
Dmitry Demidov

GitHub: @RenWoll

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
