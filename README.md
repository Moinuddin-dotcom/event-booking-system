# Event Booking System

A production-minded full-stack Event Booking System built as part of the Wenexus Full-Stack Developer Take-Home Assignment.

The system allows users to browse events, submit booking requests, and process bookings asynchronously using BullMQ with Redis while ensuring data integrity through database transactions.

---

# Tech Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Swagger

## Frontend

- React
- TypeScript
- Vite
- React Query
- React Hook Form
- Axios
- Tailwind CSS
- Sonner

## DevOps

- Docker
- Docker Compose

---

# Features

## Backend

- Create Events
- View Events
- View Event Details
- Submit Booking Requests
- View Bookings
- Pagination
- Booking Filtering
- Asynchronous Booking Processing
- Queue Worker using BullMQ
- DTO Validation
- Swagger Documentation
- Database Transactions
- Duplicate Request Protection
- Prevent Overbooking
- Database Seed Script

## Frontend

- Display Events
- Book Event
- Form Validation
- Toast Notifications
- Automatic Event Refresh

---

# Project Structure

```
event-booking-system
│
├── apps
│   ├── backend
│   └── frontend
│
├── docker
│
├── docker-compose.yml
│
├── package.json
│
└── pnpm-workspace.yaml
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone <repository-url>

cd event-booking-system
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Start Docker

```bash
docker compose up -d
```

Verify

```bash
docker ps
```

We will see

- PostgreSQL
- Redis

---

# Backend Setup

Create

```
apps/backend/.env
```

Example

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/event_booking"

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=3000
```

Generate Prisma Client

```bash
pnpm exec prisma generate
```

Run Database Migration

```bash
pnpm exec prisma migrate dev
```

Seed Sample Events

```bash
pnpm exec prisma db seed
```

This command inserts sample events into the database for testing.

Run Backend

```bash
cd apps/backend

pnpm start:dev
```

Backend

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/api
```

---

# Frontend Setup

Create

```
apps/frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
```

Run

```bash
cd apps/frontend

pnpm dev
```

Frontend

```
http://localhost:5173
```

---

# API Endpoints

## Events

### Create Event

```
POST /events
```

### Get Events

```
GET /events
```

### Get Event

```
GET /events/:id
```

---

## Bookings

### Create Booking

```
POST /bookings
```

Returns

```
202 Accepted
```

Booking requests are processed asynchronously by BullMQ.

---

### Get Bookings

```
GET /bookings
```

Supports

```
?page=1
&limit=10
&status=CONFIRMED
&eventId=1
```

---

# Booking Flow

```
Client

↓

POST /bookings

↓

Booking created (PENDING)

↓

BullMQ Queue

↓

Worker

↓

Database Transaction

↓

Validate Event

↓

Check Remaining Seats

↓

Deduct Seats

↓

Booking CONFIRMED

or

Booking FAILED
```

---

# Key Design Decisions

## Asynchronous Processing

The booking endpoint immediately returns **HTTP 202 Accepted** after creating a booking with **PENDING** status.

The actual booking logic is executed asynchronously by a BullMQ worker, improving responsiveness and scalability.

---

## Preventing Overbooking

Overbooking is prevented using a Prisma database transaction.

The worker performs the following operations inside a single transaction:

- Load event
- Check remaining seats
- Reject booking if seats are unavailable
- Deduct seats
- Mark booking CONFIRMED

Because all operations occur atomically, concurrent requests cannot reserve more seats than are available.

---

## Preventing Duplicate Bookings

Every booking request includes a unique **requestId**.

The `requestId` column is unique in the database.

Before creating a booking, the API checks whether the requestId already exists.

If it exists, the API returns **409 Conflict**, preventing duplicate bookings.

---

# Validation

DTO validation is implemented using NestJS ValidationPipe.

Validated inputs include:

- Event
- Customer Name
- Customer Email
- Seats

Appropriate HTTP status codes are returned for invalid requests.

---

# Error Handling

The application handles

- Validation Errors
- Event Not Found
- Duplicate Request
- Insufficient Seats
- Queue Processing Errors

Failed bookings are stored with:

- FAILED status
- failureReason

---

# Docker

Start services

```bash
docker compose up -d
```

Stop services

```bash
docker compose down
```

Docker services include

- PostgreSQL
- Redis

---

# Screenshots

## Home Page

![alt text](Home.png)

---

## Booking Dialog

![alt text](<booking dialog.png>)

---

## Swagger API

![alt text](swagger.png)

---

## Docker Containers

![alt text](docker.png)

---

# Future Improvements

Given more time I would implement

- Authentication & Authorization
- Unit Tests
- Integration Tests
- Booking Status Polling
- Better Dashboard UI
- Admin Dashboard
- Email Notifications
- CI/CD Pipeline
- Production Deployment

---

# Author

**Md. Moinuddin Chowdhury**

GitHub

https://github.com/Moinuddin-dotcom

LinkedIn

https://www.linkedin.com/in/md-moinuddin-chowdhury-67098123b/

Email

moinchy7@gmail.com