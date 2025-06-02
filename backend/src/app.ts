import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import todoRoutes from "./routes/todo.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for the Todo app"
    }
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"]
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
