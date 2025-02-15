const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const cor = cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
});
const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  morgan("dev"),
  cor,
];

module.exports = middleware;
