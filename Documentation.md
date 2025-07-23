Overview
----------

This API allows users to:

Register and log in

Upload videos with a title, description, and file

View videos with view count tracking

Get a list of videos by user

Handle errors and responses in a consistent format


Stage1
-------
git clone https://github.com/your-username/video-uploader-api.git
cd video-uploader-api

Stage 2
--------

Install Dependencies
npm install

Stage 3
---------

Create a .env file:
--------------------

PORT=5000
MONGODB_URI=mongodb://localhost:27017/videoUploader
JWT_SECRET=yourSecretKey

Stage 4
--------

Start The Server:
npm run dev


Consistent Response Format:
----------------------------

Success:
---------

{
  "success": true,
  "message": "Video uploaded successfully",
  "data": { ... }
}


Error
----------

{
  "success": false,
  "message": "Validation failed",
  "error": "Title is required"
}



This backend system is a clean, modular API for handling video uploads and views with:

JWT Authentication

File uploads via Multer

MongoDB for storage

Consistent error handling & status codes

Ready-to-integrate with frontend apps


API Endpoints:
-----------------

Register User
POST /api/auth/register

Login
POST /api/auth/login

Logout
POST /api/auth/logout

Upload Video
POST /api/videos/upload

View all Video
GET /api/videos/
GET /api/videos?minViews=2
GET /api/videos?minViews=2&maxViews=10
GET /api/videos?maxViews=10
GET /api/videos?sort=asc/desc
GET /api/videos?page=2&limit=5
GET /api/videos?sort=asc&page=2&limit=5
GET /api/videos?minViews=2&maxViews=10&sort=asc&page=2&limit=5

View a Video
GET /api/videos/:id

Update Video
PATCH /api/videos/:id

Delete a Video
DELETE /api/videos/:id