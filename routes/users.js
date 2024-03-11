const express = require("express");
const router = express.Router();
const UsersModel = require("../models/users");

router.get("/getUsers", async (req, res) => {
  try {
    const users = await UsersModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getUsers/:id", async (req, res) => {
  const { id } = request.params;

  try {
    const user = await UsersModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "The requested user doesn't exist" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: "Internal server error" });
  }
});

router.post("/createUser", async (req, res) => {
  const newUser = new UsersModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: Number(req.body.age),
  });

  try {
    const userToSave = await newUser.save();
    res.status(201).send({
      statusCode: 201,
      payload: userToSave,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.patch("/updateUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UsersModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "The requested user doesn't exist" });
    }

    const updatedData = req.body;
    const options = { new: true };

    const result = await UsersModel.findByIdAndUpdate(id, updatedData, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UsersModel.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "The requested user doesn't exist" });
    }

    res.status(200).send(`User with id ${id} succcesfully removed`);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
