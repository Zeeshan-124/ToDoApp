# ToDoApp
 ToDoApp with MERN STACK
# To-Do List API Documentation

This document outlines the API endpoints, their functionality, and example usage for the To-Do List Application.

---

## **Base URL**

```
http://localhost:<PORT>
```

Replace `<PORT>` with the actual port number (default: 5000).

---

## **Setup Instructions**

### **Requirements**

- Node.js (v16 or higher recommended)
- MongoDB (local or cloud instance)

### **Steps to Run Locally**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd to-do-list-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret>
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. The API will be accessible at `http://localhost:5000`.

---

## **User Routes**

### **Register User**

**Endpoint:** `/api/users/register` **Method:** `POST`

**Request Body:**

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

- **201 Created:**

```json
{
  "userInformation": {
    "_id": "<userId>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "<authToken>"
}
```

- **400 Bad Request:**

````json
{
  "message": "User already exists"
}

---

### **Login User**
**Endpoint:** `/api/users/login`
**Method:** `POST`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
````

**Response:**

- **200 OK:**

```json
{
  "userInformation": {
    "_id": "<userId>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "<authToken>"
}
```

- **401 Unauthorized:**

````json
{
  "message": "Invalid email or password"
}

---

### **Get User Profile**
**Endpoint:** `/api/users/profile`
**Method:** `GET`
**Authorization:** Bearer `<authToken>`

**Response:**
- **200 OK:**
```json
{
  "userInformation": {
    "_id": "<userId>",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "todoList": []
  }
}
````

- **404 Not Found:**

````json
{
  "message": "User not found"
}

---

### **Logout User**
**Endpoint:** `/api/users/logout`
**Method:** `GET`
**Authorization:** Bearer `<authToken>`

**Response:**
- **200 OK:**
```json
{
  "message": "Logged out successfully",
  "blacklistedToken": {
    "_id": "<blacklistId>",
    "token": "<authToken>",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
````

- **400 Bad Request:**

```json
{
  "message": "No token provided"
}
```

---

## **To-Do List Routes**

### **Add To-Do Item**

**Endpoint:** `/api/todos/addItem` **Method:** `POST`

**Request Body:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, Bread, and Eggs",
  "email": "john.doe@example.com"
}
```

**Response:**

- **200 OK:**

```json
{
  "todoItem": {
    "_id": "<todoId>",
    "title": "Buy groceries",
    "description": "Milk, Bread, and Eggs",
    "completed": false,
    "expanded": false,
    "user": "<userId>",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### **Update To-Do Item**

**Endpoint:** `/api/todos/updateItem/:id` **Method:** `PUT`

**Request Body:**

```json
{
  "title": "Buy fruits",
  "description": "Apples and Bananas",
  "email": "john.doe@example.com"
}
```

**Response:**

- **200 OK:**

```json
{
  "message": "Updated successfully"
}
```

---

### **Update To-Do Item Status**

**Endpoint:** `/api/todos/updateItem/status/:id` **Method:** `PUT`

**Request Body:**

```json
{
  "completed": true,
  "email": "john.doe@example.com"
}
```

**Response:**

- **200 OK:**

```json
{
  "message": "Status updated successfully"
}
```

---

### **Update To-Do Item Expansion**

**Endpoint:** `/api/todos/updateItem/expansion/:id` **Method:** `PUT`

**Request Body:**

```json
{
  "expanded": true,
  "email": "john.doe@example.com"
}
```

**Response:**

- **200 OK:**

```json
{
  "message": "Expansion updated successfully"
}
```

---

### **Delete To-Do Item**

**Endpoint:** `/api/todos/deleteItem/:id` **Method:** `DELETE`

**Request Body:**

```json
{
  "email": "john.doe@example.com"
}
```

**Response:**

- **200 OK:**

```json
{
  "message": "Deleted successfully"
}
```

---

### **Get To-Do Items**

**Endpoint:** `/api/todos/getItem/:id` **Method:** `GET`

**Response:**

- **200 OK:**

```json
{
  "todoItems": [
    {
      "_id": "<todoId>",
      "title": "Buy groceries",
      "description": "Milk, Bread, and Eggs",
      "completed": false,
      "expanded": false,
      "user": "<userId>",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

- **200 OK (No Task):**

```json
{
  "message": "No task"
}
```

