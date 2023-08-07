# Alex & Melanie -  Backend | Node.js / Express.js / MongoDB

## Kevin van der Schans | ISDI Coders Final Project 2023

<br>

<p align="center">
  <img src="public/readme-gif-back.gif" alt="Alex & Melanie Home image" width="750">
</p>

<br>

**_Alex & Melanie_** is a Desktop API WEB of an **e-commerce of online courses of Latin dances**. 

The user will be able to register and log in to the website, where they will be able to view 24 different types of dance courses.

In addition, it has a user with ADMINISTRATOR role to perform a **CRUD** (create, edit and delete a course) to update the content.

### The backend of this application is built with Node.js, Express.js and TypeScript; according to the DDD (Domain-Driven-Design) architecture pattern. It is responsible for:

- Provide the logic and functionality necessary for its correct operation.

- Manage user registration and authentication. Provide endpoints for user profile management.

- Product management. Allows the reading, creation, update and deletion of dance courses.

- Requests management. Allows the creation and reading of requests.

- Authenticate with JWT.

- Save videos and images with Firebase and optimize them with Sharp.

<br>

# Index

1. [Project title and description](#alex--melanie---backend--nodejs--expressjs--mongodb)

2. [Project installation](#project-installation)

3. [Link to Frontend Repository](#link-to-frontend-repository)

4. [Project status](#project-status)

5. [Features](#features)

6. [Endpoints](#endpoints)

7. [Contribution](#contribution)

8. [Project Developer](#project-developer)

<br>

## Project installation

Before running the backend of this application, make sure you have the following dependencies installed:

- Node.js: [Download and install Node.js](https://nodejs.org)
- MongoDB: [Download and install MongoDB](https://www.mongodb.com)
- Git: [Download and install Git](https://git-scm.com/)

<br>

Once you have installed the dependencies, follow these steps to configure and run the backend:

1. Clone the repository: `git clone https://github.com/KevinVanDerSchans/2023-04-Kevin-Schans-Final-Project-ISDI-Coders-Back.git`
<br>

2. Navigate to the project directory: `cd 2023-04-Kevin-Schans-Final-Project-ISDI-Coders-Back.git`
<br>

3. Install dependencies: `npm install`
<br>

4. Set environment variables: Create an .env file in the root directory of the project and set the required environment variables. See the .env.example file for a list of required variables.
<br>

5. Start the server: `npm run server`

<br>

## Link to Frontend Repository

https://github.com/KevinVanDerSchans/2023-04-Kevin-Schans-Final-Project-ISDI-Coders-Front

<br>

## Project status

<br>

![Badge en Desarrollo](https://img.shields.io/badge/STATUS-UNDER%20DEVELOPMENT-red)

<br>

## Features

<br>

In this ***first phase*** of the project...

<br>

The ***user*** will be able to:

- **Register** as a user and **log in** to the web site.

- Go to **MY COURSES** section and will be able to see a **list** of all the online courses.

- If the user decides to click on any of them, a **Details** page will be dynamically created to display the **details** of that course.

- In the following implementations of the ***first phase*** the user will be able to bookmark any course and have a list of his own.

<br>

The ***administrator*** will be able to:

- Perform the **same functionalities** as a user.

- **Create** a new course. In case the user has an administrator role, a link **Create a new course** will be rendered where there will be a form to create a new item. In addition to the data, an image and a video will be required.

- **Edit** an existing course. As an administrator, in each item of the list you will be able to see a button to edit it. This button will navigate to a form where it will dynamically collect the existing data of that item, so that you can modify them as you wish. Then, by clicking on **Update** button, the item will be permanently updated.

- **Delete** a course. In the same way as the previous link, next to the Edit button, a button will be rendered on the item's card to delete it from the list and from the database.

<br>

## Endpoints

### User

| Method | URL            | Description                                                                                         |
| ------ | -------------- | --------------------------------------------------------------------------------------------------- |
| POST   | /user/register | Register a new user. Required fields: `username`, `email` and `password`. |
| PATCH  | /user/login    | Authenticate a user. Required fields: `username` and `password`.                            |
| GET    | /user          | Retrieve a list of users.                                                                           |
| GET    | /user/:id      | Retrieve a user by ID.                                                                              |

<br>

### DanceCourse

| Method | URL                     | Description |
| ------ | ---------------         | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /danceCourses           | Retrieve the danceCourses list. |
| GET    | /danceCourse/:id        | Retrieve a single danceCourse by ID.      
| POST   | /danceCourses           | Create a new danceCourse.     
| PATCH  | /danceCourses/:id       | Update a single danceCourse by ID.
| DELETE | /danceCourses/:id       | Delete a single danceCourse by ID.

<br>

## Contribution

If you want to contribute to this project, follow these steps:

1. Perform a fork to the repository.
<br>

2. Create a branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
<br>

3. Make the necessary changes and commits:  `git commit -am 'Add some feature'`
<br>

4. Push to branch: `git push origin feature/your-feature-name`
<br>

5. Send a pull request to the original repository.

<br>

## Project developer

<br>

| [<img src="https://avatars.githubusercontent.com/u/122877560?v=4" width=115><br><sub>Kevin Schans</sub>](https://github.com/KevinVanDerSchans) |
:------------------------------------------------------------------------------------------------------------------------------------------: |
