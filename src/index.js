import app from "./api/app.js";
import database from "./infrastructure/db/connection.js"
import startConsumer from "./infrastructure/kafka/kafka.consumer.js";

async function startServer() {
    await database();

    await startConsumer();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}

startServer();