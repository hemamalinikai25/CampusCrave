# CampusCrave — Smart Campus Food Ordering & Queue Management System

## 1. Project Description
CampusCrave is a Java Full Stack web application designed to simplify food ordering in college canteens. Students can view available food items, place orders, and track order statuses. Canteen staff can view orders and update their preparation status.

## 2. Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java 17, Spring Boot
- **Database:** MySQL
- **Development IDE:** IntelliJ IDEA
- **API Testing:** Postman

## 3. Main Features
- View available food items.
- Add, update, and delete food items.
- Place food orders.
- View customer orders.
- Track order statuses.
- Staff dashboard for managing orders.
- REST API integration with MySQL.

## 4. Prerequisites
Install the following software before running the project:
- Java JDK 17
- MySQL Server
- IntelliJ IDEA or another Java IDE

## 5. Setup Instructions
1. Extract `CampusCrave_Final.zip`.
2. Open the extracted project folder in IntelliJ IDEA.
3. Configure MySQL and update the database connection settings in the project configuration file.
4. Ensure the required database and tables are available.
5. Allow Maven to download the required dependencies.
6. Run the Spring Boot application from the main application class.
7. Open `http://localhost:8080/` in a browser to access the customer page.
8. Open `http://localhost:8080/staff.html` to access the staff dashboard.

## 6. API Endpoints

### Food APIs
- `GET /api/food` — Retrieve food items.
- `POST /api/food` — Add a food item.
- `PUT /api/food/{id}` — Update a food item.
- `DELETE /api/food/{id}` — Delete a food item.

### Order APIs
- `POST /api/orders` — Place an order.
- `GET /api/orders` — Retrieve all orders.
- `GET /api/orders/{id}` — Retrieve a specific order.
- `PUT /api/orders/{id}/status` — Update an order's status.

## 7. Order Statuses
- **PLACED:** The order has been placed.
- **PREPARING:** The canteen is preparing the order.
- **READY:** The order is ready for collection.

## 8. Limitations
- Online payment integration is not implemented.
- User authentication and role-based access control are not implemented.
- Order deletion is not implemented.

## 9. Future Enhancements
- Online payment integration.
- Student and staff authentication.
- Order notifications.
- Improved queue-time estimation.

## 10. Author
College Java Full Stack Project
