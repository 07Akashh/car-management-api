# Car Management System API

This project is a backend API for managing car listings. It allows users to create, read, update, and delete car listings, upload car images, and perform other related operations.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features
- Manage car listings (CRUD operations).
- Upload and delete car images.
- Pagination and filtering of car listings.
- Secure API with input validation and error handling.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **Mongoose**: ODM for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Image hosting and storage .
- **Joi**: Input validation.
- **Cors**: Middleware for handling cross-origin requests.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/07Akashh/car-management-api.git
   cd car-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```dotenv
     PORT=5000
     MONGO_URI=your_mongo_database_uri
     CLOUDINARY_URL=your_cloudinary_url
     JWT_SECRET=your_jwt_secret
     ```

4. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints

### User
| Method | Endpoint              | Description                | Auth Required |
|--------|-----------------------|----------------------------|---------------|
| GET    | `/user`               | Get Logged in User Detail .| Yes           |
| GET    | `/user/login`         | Login user with email and password .| No   |
| POST   | `/user/register`      | Create a new user.         | No            |
| POST    | `/user/logout`       | User Logout.               | Yes           |

### Cars
| Method | Endpoint              | Description                | Auth Required |
|--------|-----------------------|----------------------------|---------------|
| GET    | `/api/car`           | Get all cars (with filters/pagination). | No|
| GET    | `/api/car/search`    | Search Car by name, tag, or title. | No     |
| GET    | `/api/car/:id`       | Get details of a specific car. | No         |
| POST   | `/api/car`           | Create a new car listing.   | Yes           |
| PUT    | `/api/car/:id`       | Update a car listing.       | Yes           |
| DELETE | `/api/car/:id`       | Delete a car listing.       | Yes           |

### Images
| Method | Endpoint              | Description                | Auth Required |
|--------|-----------------------|----------------------------|---------------|
| POST   | `/api/images/upload`  | Upload car images.         | Yes           |

## Project Structure

```plaintext
car-management-api/
│
├── src/
│   ├── config/               # Configuration files (e.g., database, cloudinary).
│   │   └── cloudinary.js
│   │
│   ├── controllers/          # Logic for handling requests and responses.
│   │   ├── car.controller.js
│   │   ├── user.controller.js
│   │   └── image.controller.js
│   │
│   ├── middlewares/          # Middleware functions (e.g., auth, validation).
│   │   ├── authMiddleware.js
│   │   └── cloudinaryUpload.js
│   │
│   ├── models/               # Mongoose schemas for the database.
│   │   ├── Car.modal.js
│   │   └── User.modal.js
│   │
│   ├── routes/               # API route definitions.
│   │   ├── car.route.js
│   │   ├── image.route.js
│   │   ├── user.route.js
│   │   └── route.js
│   │
│   ├── validations/          # Joi validation schemas.
│   │   ├── carValidation.js
│   │   └── userValidation.js
│   │
│   └── index.js             # Server entry point.
├── .env                      # Environment variables.
├── .gitignore                # Files to ignore in Git.
├── package.json              # Node.js project dependencies and scripts.
└── README.md                 # Documentation for the project.
```

## Example Request

### Create a Car
**POST** `/api/cars`
```json
{
        "_id": "673871dfbfde1c558192c6d5",
        "title": "Toyota Camry D3",
        "description": "A reliable sedan with a smooth ride and fuel efficiency .",
        "tags": "Toyota Camry, sedan, vehiclesss",
        "company": "Toyota",
        "dealer": 123456,
        "price": 32000,
        "year": 2019,
        "mileage": 45000,
        "color": "White",
        "transmission": "Automatic",
        "fuelType": "Hybrid",
        "owner": {
            "_id": "6737473b2eecc3ecee269b82",
            "firstName": "user",
            "lastName": "One",
            "email": "user2@gmail.com"
        },
        "images": [
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731676915/car_images/ues3a8be73sfuiyll9e8.jpg",
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731676917/car_images/yjsi5sf1tddbwcp5jzva.jpg",
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731676917/car_images/lmsr14e7ax74jeudvdjy.jpg",
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731676917/car_images/ao7rarbqjvhycsmbtz6h.jpg",
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731676917/car_images/jvbgkodfspvibhtgkjjh.jpg",
            "https://res.cloudinary.com/dmao0koo4/image/upload/v1731785161/car_images/mwfqxerntqd59o1hkmio.webp"
        ]
    }
```

## License
This project is licensed under the MIT License.