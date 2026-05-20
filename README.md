# Backend System (DDD & Kafka)

A scalable, event-driven backend system built with **Node.js, Express, MongoDB, and Apache Kafka**. The application strictly follows **Domain-Driven Design (DDD)** and the **Repository Pattern** to ensure a clean separation of concerns and maintainable code.

---

# Architecture & Structure (DDD)

This project is structured into four distinct layers to separate business logic from technical implementations:

### 1. Domain Layer (`src/domain/`)
The core of the application. Contains the `PostEntity` which enforces business rules and validation. It has **zero dependencies** on external libraries like Express or Mongoose.

### 2. Application Layer (`src/application/`)
Contains the `PostUseCase`. It orchestrates the flow of data, acting as a bridge between the API layer and the Infrastructure layer.

### 3. Infrastructure Layer (`src/infrastructure/`)
Handles all external communications:

#### Database
Implements the **Repository Pattern** (`post.repository.js`). It fetches Mongoose documents and safely maps them back into pure `PostEntity` objects so Mongoose never leaks into the business logic.

#### Messaging
Contains the Apache Kafka Producer and Consumer.

### 4. API Layer (`src/api/`)
Express.js routers and controllers that strictly handle HTTP requests and responses.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Apache Kafka (KRaft Mode)
- Docker & Docker Compose

---

# Prerequisites

To run this project locally, you only need:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

You do **not** need to install Node.js, MongoDB, or Kafka manually.

---

# How to Run the Application

> **Note:** This project uses Apache Kafka in **KRaft mode** (without Zookeeper) for a more modern and lightweight containerized setup.

## 1. Clone the Repository

```bash
git clone <GITHUB_REPO_URL>
cd <REPO_NAME>
```

---

## 2. Build and Start the Containers

```bash
docker compose up --build -d
```

This command will:

- Build the Node.js application container
- Start MongoDB
- Start Apache Kafka
- Start the backend server
- Automatically create the internal Docker network between services

---

## 3. Wait for Kafka Initialization

Kafka may take around **15–30 seconds** to fully initialize on the first startup.

If the backend container exits before Kafka becomes ready, simply restart it using:

```bash
docker restart dev-container
```

---

## 4. Verify Running Containers

```bash
docker ps
```

You should see:

- mongodb
- kafka
- dev-container

running successfully.

---

# Accessing the API

The backend server is exposed on:

```bash
http://localhost
```

---

# API Endpoints

A Postman collection is included in the root of this repository:

```bash
Testing.postman_collection.json
```

You can import it directly into Postman for testing.

## Available Endpoints

### Get All Posts

```http
GET /posts
```

---

### Get Single Post

```http
GET /posts/:id
```

---

### Create New Post

```http
POST /posts
```

#### Request Body

```json
{
  "title": "Post Title",
  "content": "Post Content"
}
```

---

# Event-Driven Flow (Apache Kafka)

This system implements an asynchronous event-driven architecture.

## Flow Overview

1. A client sends a request to the API.
2. The Use Case processes the request.
3. Data is saved into MongoDB.
4. A Kafka event is produced to the `post-events` topic.
5. The Kafka Consumer listens to the topic asynchronously.
6. The event payload is processed and logged successfully.

---

## View Kafka Consumer Logs

To monitor the Kafka event flow in real time:

```bash
docker logs -f dev-container
```

---

# Docker Infrastructure

The system is fully containerized using Docker Compose with three isolated services:

- MongoDB
- Apache Kafka
- Node.js Backend Server

All services communicate internally using Docker networking and service discovery.

Kafka runs in **KRaft mode** without Zookeeper for a cleaner and more modern setup.

---

# Deployment Notes

The original task requested deployment using AWS or GCP.

The project was fully prepared for cloud deployment using Docker Compose and containerized infrastructure principles.

However, due to cloud account provisioning limitations requiring billing-enabled resources, the live demonstration was simulated using:

- Docker Compose
- Local containerized infrastructure
- Ngrok tunnel exposure

This approach allows the backend system to be externally accessible and tested similarly to a deployed cloud environment.

---

# Simulating Deployment Using Ngrok

## 1. Start the Containers

```bash
docker compose up --build -d
```

---

## 2. Expose the Backend Publicly

```bash
ngrok http 80
```

Ngrok will generate a public URL similar to:

```bash
https://random-id.ngrok-free.app
```

This URL can be used to access and test the API externally.

---

# Production Deployment Approach (AWS/GCP)

The application architecture was designed to support deployment on cloud infrastructure platforms such as AWS or GCP.

## Typical Deployment Flow

### 1. Provision a Linux VM
Examples:
- AWS EC2
- Google Compute Engine

### 2. Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
```

### 3. Clone the Repository

```bash
git clone <GITHUB_REPO_URL>
cd <REPO_NAME>
```

### 4. Start the Infrastructure

```bash
docker compose up --build -d
```

### 5. Configure Firewall / Security Groups

Expose:
- Port 80 (HTTP)
- Port 9092 (Kafka if needed)

---

# References & Research

To implement this system according to professional industry standards, the following documentation and resources were researched and referenced:

## Architecture

- [Domain-Driven Design (DDD) - GeeksforGeeks](https://www.geeksforgeeks.org/system-design/domain-driven-design-ddd)

---

## Event-Driven Architecture

- [Apache Kafka Guide](https://youtu.be/Ch5VhJzaoaI?si=0Hspr8h863QrPH1a)

---

## Kafka Client

- [KafkaJS Documentation](https://www.npmjs.com/package/kafkajs)

---

## Docker & Kafka Infrastructure

Kafka KRaft implementation and infrastructure concepts were adapted from:

- [LeetJourney's YouTube Guide](https://www.youtube.com/watch?v=LS6eqjBsxpM)
- [Home Energy Tracker Repository](https://github.com/leetjourney/home-energy-tracker)

---

# Final Notes

This project demonstrates:

- Domain-Driven Design (DDD)
- Repository Pattern
- Event-Driven Architecture
- Apache Kafka Integration
- Docker Containerization
- Clean Architecture Principles
- Internal Service Networking
- Scalable Backend Design
