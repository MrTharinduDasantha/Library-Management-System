# Event Planning System

A simple library management system built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows admins to manage books and users to view, search, and request books for download with notification features.


## Demo

Click the link below to see the demonstration of the Library Management System.

Link 👉 https://drive.google.com/file/d/1-IY0wHUNpT9FVWahgqEvxbOD0KpoQjCp/view?usp=sharing 👈


## Features

### Admin
- Admin Registration & Login: Register as an admin and log in to the admin panel.
- Add Book: Upload books with details including title, author, category, cover image, and PDF file.
- Edit Book: Update book details at any time.
- Delete Book: Remove books from the system.
- View Registered Users & Admins: Display all registered users and admins.
- Manage Download Requests: Accept or delete user requests to download books.

### User
- User Registration & Login: Register as a user and log in to the system.
- View Books: Browse all available books.
- Search Books: Filter books by category and search by title or author.
- Read Books Online: Read books directly without requesting downloads.
- Request Book Download: Send a request to the admin to download a book.
- Notifications: View the status of book download requests.

### Authentication & Access Control
- Admin Access: Admins can access the admin panel with full book management and user control features.
- User Access: Users can browse, search, and request books but cannot manage books or users.


## Technologies Used

### Frontend
- React with Vite
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB for the database
- Multer for handling book cover image and PDF uploads
- dotenv for environment variables


## Installation

Clone the repository and navigate to each project folder to install dependencies.
```bash
  git clone https://github.com/MrTharinduDasantha/Event-Planning-System.git
  cd Event-Planning-System
```
#### Folder Setup
The project is divided into three main folders: admin, frontend, and backend. You will need to install dependencies for each.
- Navigate to each folder (admin, frontend, backend) and run.
```bash
npm install
```
#### Environment Variables
Before running the app, configure the .env file in the backend folder with the necessary environment variables.
- Create a .env file in the backend folder.
- Replace placeholders with your actual values:
```bash
PORT = 5000
JWT_SECRET = library_management_secret
MONGO_URI = Enter your mongodb uri
```
#### Run the Project.
- Start the backend server
```bash
cd backend
npm start
```
- Start the admin
```bash
cd ../admin
npm start
```
- Start the frontend
```bash
cd ../frontend
npm start
```


## Usage
1. Admin
- Navigate to the Admin Dashboard (http://localhost:5173).
2. Client
- Open the Frontend Interface (http://localhost:5174.


## Screenshots

![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%203.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%204.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%205.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%206.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%207.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%208.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%209.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/0b5d42c720c419b4a2dd963e2d702d9101aeabab/Img%20-%2010.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2011.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2012.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2013.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2014.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2015.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2016.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2017.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2018.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2019.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2020.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2021.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2022.png)
![image alt](https://github.com/MrTharinduDasantha/Library-Management-System/blob/8963aa89b0e08911f7c9719882afd169bd9fa958/Img%20-%2023.png)

<h4 align="center"> Don't forget to leave a star ⭐️ </h4>
