require("dotenv").config();
const app = require("./src/app/app");
const http = require("http");
const databaseConnection = require("./src/db/database");

databaseConnection();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
