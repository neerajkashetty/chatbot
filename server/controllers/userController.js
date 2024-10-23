const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../sequelize/models");
const User = db.User;
const fs = require("fs");
const { generateFromEmail } = require("unique-username-generator");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("Received sign-up request with body:", req.body); // Debugging

    const username = generateFromEmail(email, 4);

    // Check if user already exists
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return res.status(409).json({ error: "Email already taken" });
    }

    // Load private key for JWT
    const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

    if (!privateKey) {
      return res.status(500).json({ error: "JWT private key missing" });
    }

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user data
    const data = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    };

    const usertable = await User.create(data);

    if (usertable) {
      // Generate JWT token
      const token = JWT.sign({ id: usertable.id }, privateKey, {
        expiresIn: "1h", // Correct format for 1 hour
        algorithm: "RS256",
      });

      // Set the cookie
      res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json({
        success: true,
        data: {
          firstName,
          lastName,
          email,
          token,
        },
      });
    } else {
      return res.status(400).json({ error: "User creation failed" });
    }
  } catch (error) {
    console.error("Error occurred during sign-up:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ sucess: false, message: "No user with the provided email" });
    }

    const encrypted = user.password;
    const isSame = await bcrypt.compare(password, encrypted);

    console.log(password);

    if (!isSame) {
      return res
        .status(401)
        .json({ sucess: false, message: "Incorrect Password" });
    }

    const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

    let token = JWT.sign({ id: user.id }, privateKey, {
      expiresIn: "1hr",
      algorithm: "RS256",
    });

    return res.json({
      sucess: true,
      data: {
        username: user.username,
        authtoken: token,
      },
    });
  } catch (error) {
    res.status(500).send("Error" + error.message);
  }
};

module.exports = {
  signUp,
  Login,
};
