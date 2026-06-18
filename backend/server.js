const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const logger = require("./logger");

const client = require("prom-client");

const app = express();

const PORT = process.env.PORT || 3001;

/* ---------------- PROMETHEUS ---------------- */

client.collectDefaultMetrics();

const register = client.register;

// Count total HTTP requests
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"],
});

// Measure request duration
const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests",
  labelNames: ["method", "route", "status"],

  buckets: [0.1, 0.5, 1, 2, 5],
});

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  const end = requestDuration.startTimer();

  res.on("finish", () => {
    httpRequests.inc({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
    });

    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      time: new Date().toISOString(),
    });
  });

  next();
});

/* ---------------- ROUTES ---------------- */

app.use("/api/tasks", taskRoutes);

/* Health Check */

app.get("/", (req, res) => {
  res.json({
    message: "Student Task Manager API Running",
  });
});

/* Prometheus Metrics */

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

/* 404 */

app.use((req, res) => {
  logger.warn({
    route: req.originalUrl,
    status: 404,
  });

  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* Error Handler */

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* Server */

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);

  console.log(`Server running on http://localhost:${PORT}`);
});