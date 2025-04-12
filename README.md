# Gym Class Scheduling and Membership Management System

A RESTful API built with **TypeScript**, **Express.js**, **Prisma**, and **PostgreSQL** that manages gym operations efficiently by handling users, roles, class schedules, bookings, and authentication.

---

## 🚀 Live Link

[https://your-vercel-project.vercel.app](https://your-vercel-project.vercel.app)

---

## 📘 Project Overview

This system is designed to manage gym operations, including user management (Admins, Trainers, Trainees), class scheduling, class bookings, and role-based permissions.

### Roles:
- **Admin**: Create/manage trainers, schedule classes (max 5 per day), assign trainers.
- **Trainer**: View assigned schedules.
- **Trainee**: Manage profile, book or cancel classes (max 10 trainees per schedule, no double booking).

---

## ⚙️ Technology Stack

| Technology   | Description                     |
|--------------|---------------------------------|
| TypeScript   | Language                        |
| Express.js   | Web Framework                   |
| Prisma       | ORM for PostgreSQL              |
| PostgreSQL   | Relational Database             |
| JWT          | Authentication                  |
| Vercel       | Deployment                      |

---

## 🧩 Modular Folder Structure (MVC)



---

## 🛠️ How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gym-management-system.git
cd gym-management-system

npm install
```
## Environment Variables
```bash
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
PORT=3000
```
## Setup Prisma ORM
```bash

npx prisma migrate dev --name init
npx prisma generate

npm run dev
```
## Admin credentials
```bash
Email: admin@email.com
Password: admin123
```
## Trainer credentials
```bash
Email: trainer@email.com
Password: trainer123
```

## Trainee credentials
```bash
Email: trainee@email.com
Password : trainee123
```
## Auth

|Method	Endpoint	         |   payloads                               |     Description       |
|----------------------------|------------------------------------------|-----------------------|
|POST	/api/auth/register	 |   firstName,lastName,email,password      |    Register user      |
|----------------------------|------------------------------------------|-----------------------|
|POST	/api/auth/login	     |   email,password                         |     Login user        |

## User(Admin)

|POST /api/users/create-trainer    |  payloads: firstName, lastName,email,password   |  Create a trainer profile            |
|----------------------------------|-------------------------------------------------|--------------------------------------|       
|POST api/classes/create-class     | payloads: date,startTime,trainerId              |  cretae class and assign a trainer   | 
|----------------------------------|-------------------------------------------------|--------------------------------------|
|POST /api/users/trainer-profile   | payloads:trainerId, updatedData                 |  Update trainer profile              |
|----------------------------------|-------------------------------------------------|--------------------------------------|
|GET /api/users/trainer-profile    | payloads:trainerId                              |  Get trainer profile


## User(Trainer)

GET /api/classes/schedules -------  payloads: trainerId       ---------        Get trainer shceduled classes

## User (Trainee)

GET /api/users/profile     --------   payloads:userId             -------            Get user profile

GET /api/classes/available -------- payloads:                      -------         Get available classes

POST /api/users/profile    -------- payloads:userId, updatedData   --------         Update user profile

POST /api/bookings/book    -------- payloads: userId, classId      ---------         User will book a class