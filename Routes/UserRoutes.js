const express = require("express");

const Router = express.Router();

const { Register, Login , getUsers, getOneUser } = require("../Controller/User");

const Auth = require ("../Middleware/Auth")

Router.post("/register", Register);
Router.post("/login", Login);
Router.get("/peoples",Auth, getUsers);
Router.get("/getOneUser/:id" , getOneUser)


module.exports = Router;
