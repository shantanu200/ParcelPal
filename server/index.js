import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./config/db.js";
import companyRoutes from "./routes/CourierCompany.js";
import testRoutes from "./Test/TestRoute.js";
import employeesRoutes from "./routes/Employee.js";
import packageRoutes from "./routes/Packages.js";
import { dijkstra } from "./algorithm/ShortesPath.js";
import { puneGraph } from "./constants/PuneGraph.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

/**
 *  Application routes
 */
app.get("/", async (req, res) => {
  const graph = puneGraph;
  const path = dijkstra(graph, "Hinjawadi", "Baner");
  res.status(200).json(path);
});
app.use("/test", testRoutes);
app.use("/company", companyRoutes);
app.use("/employee", employeesRoutes);
app.use("/package",packageRoutes);

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  connection();
  console.log(`Server URL :: http://localhost:${PORT}`);
});
