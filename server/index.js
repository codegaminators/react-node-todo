const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// express middleware
app.use(cors());
app.use(express.json());

// Custom routes
app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.use("/api/v1/todo", todoRoutes);

const startServer = async () => {
  const MONGO_URI = "mongodb://localhost:27017/school";
  //   await mongoose
  //     .connect("mongodb://localhost:27017/school")
  //     .then((db) => console.log(`mongodb conncted to ${db.connection.host}`))
  //     .catch((err) => {
  //       console.log(err);
  //       process.exit(1);
  //     });

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
    console.log(`mongodb connected to ${db.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  app.listen(8000, (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("server started on port 8000");
  });
};

startServer();
