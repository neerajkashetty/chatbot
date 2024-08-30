const express = require("express");
const { sequelize } = require("../sequelize/models");
const cors = require("cors");
const { signUp, Login } = require("../controllers/userController");
const { docLoader, addDocumentsToPinecone } = require("../controllers/docLoader");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/signUp", signUp);
app.use("/api/Login", Login);
app.use("/api/ai", docLoader);
app.use("/api/addDocs", addDocumentsToPinecone);

// Import and use the conversation router
const conversation = require("../routes/conversation");
app.use("/api/conversation/", conversation);

const verify = require("../routes/verifyRoute");
app.use("/api/user", verify);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to database.");
  } catch (error) {
    console.log("An error occurred while connecting to the database, \n", error);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  app.listen(3002, () => console.log("Server running on the port", 3002));
})();
