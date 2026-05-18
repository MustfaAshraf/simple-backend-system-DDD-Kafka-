# Backend System (DDD & Kafka)

A scalable, event-driven backend system built with **Node.js, Express, MongoDB, and Apache Kafka**. The application strictly follows **Domain-Driven Design (DDD)** and the **Repository Pattern** to ensure a clean separation of concerns and maintainable code.

## Architecture & Structure (DDD)

This project is structured into four distinct layers to separate business logic from technical implementations:

*   **1. Domain Layer (`src/domain/`)**: The core of the application. Contains the `PostEntity` which enforces business rules and validation. It has **zero dependencies** on external libraries like Express or Mongoose.
*   **2. Application Layer (`src/application/`)**: Contains the `PostUseCase`. It orchestrates the flow of data, acting as a bridge between the API layer and the Infrastructure layer.
*   **3. Infrastructure Layer (`src/infrastructure/`)**: Handles all external communications:
    *   **Database**: Implements the **Repository Pattern** (`post.repository.js`). It fetches Mongoose documents and safely maps them back into pure `PostEntity` objects so Mongoose never leaks into the business logic.
    *   **Messaging**: Contains the Apache Kafka Producer and Consumer. 
*   **4. API Layer (`src/api/`)**: Express.js routers and controllers that strictly handle HTTP requests and responses.

## Prerequisites

To run this project, you do not need to install Node.js, MongoDB, or Kafka locally. You only need:
*   [Docker](https://www.docker.com/products/docker-desktop)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run Locally

*Note: This architecture utilizes Kafka in **KRaft mode** (Zookeeper-less) for a more modern, lightweight, and container-friendly messaging setup.*

1. **Clone the repository:**
   ```bash
   git clone <GITHUB_REPO_URL>
   cd <REPO_NAME>
2. **Start the infrastructure and application:**
   ```bash
   docker-compose up --build -d

*Note: Wait about 15-30 seconds for Kafka to fully initialize. Because the container is mapped to port 80 and if the server container is exited, just restart it*

# API Endpoints & Testing

A Postman collection is included in the root of this repository (`Testing.postman_collection.json`). You can import it directly into Postman to test the endpoints.

- `GET /posts` - Retrieve all posts.
- `GET /posts/:id` - Retrieve a specific post by its ID.
- `POST /posts` - Create a new post (Requires `title` and `content` in body).

---

# Event-Driven Flow (Apache Kafka)

This system implements an asynchronous event-driven architecture:

1. When a client successfully hits an endpoint (e.g., creating a post), the API responds instantly (`201 Created`).

2. In the background, the Application Use Case triggers the Kafka Producer to send an event to the `post-events` topic.

3. The Kafka Consumer (running in the background with `groupId: 'post-group'`) listens for these events, parses the payload, and logs the successful actions.

To view the Kafka consumer logs triggering in real-time, run:

```bash
docker logs -f dev-container
```

# References & Research

To implement this system to professional industry standards, I researched and referenced the following documentation and tutorials:

- **Architecture Framework:**  
  [Domain-Driven Design (DDD) - GeeksforGeeks](https://www.geeksforgeeks.org/system-design/domain-driven-design-ddd)

- **Event-Driven Concepts:**  
  [Apache Kafka Guide](https://youtu.be/Ch5VhJzaoaI?si=0Hspr8h863QrPH1a)

- **Node.js Kafka Client:**  
  [KafkaJS NPM Documentation](https://www.npmjs.com/package/kafkajs)  
  *(Used for Producer & Consumer configuration)*

- **Docker Infrastructure:**  
  Implementation of the modern Kafka KRaft mode (without Zookeeper) was adapted from:
  
  - [LeetJourney's YouTube Guide](https://www.youtube.com/watch?v=LS6eqjBsxpM)
  - [Home Energy Tracker GitHub Repository](https://github.com/leetjourney/home-energy-tracker)
