const User = require("../Model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const checkName = await User.findOne({ name });

    if (checkName) {
      return res.status(404).json({
        message: "userName already exist change userName",
      });
    }
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exist change Email",
      });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
    });

    res.status(201).json({
      message: "registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({
        message: "Invalid Email or Password",
      });
    }

    const checkPass = await bcrypt.compare(password, oldUser.password);

    if (!checkPass) {
      return res.status(404).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ id: oldUser._id }, process.env.JWT);

    res.status(200).json({
      message: "Login Successful",
      token: token,
      id: oldUser._id,
      role: oldUser.role,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const user = await User.find(query).select("-password");

    res.status(200).json({
      message: "User fetched successfully",
      Users: user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await User.findById(id).select("-password");

    res.status(200).json({
      message: "one user fetched Successfully",
      oneUser: oneUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { Register, Login, getUsers , getOneUser };
