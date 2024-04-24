const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const db = require("../sequelize/models");
const User = db.User;
const fs = require("fs");
const {
  generateFromEmail,
  generateUsername,
} = require("unique-username-generator");

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const username = generateFromEmail(email, 4);

    const user = await User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
        "isNewUser",
      ],
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(404).json({ error: "Email Already taken" });
    }

    const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

    const saltRounds = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, saltRounds)
    //console.log("hvjhjhjh",hashedPassword)
    const data = {
      firstName,
      lastName,
      username: username,
      email,
      password,
      isNewUser: true,
    };

    const usertable = await User.create(data);

    console.log(user);

    if (usertable) {
      let token = JWT.sign({ id: user.id }, "hello", {
        expiresIn: "1hr",
        algorithm: "HS256",
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      //send users details
      return res.json({
        sucess: true,
        data: {
          firstName,
          lastName,
          email,
          token,
        },
      });
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log("error is ", error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //const privateKey = fs.readfileSync("./private.key", "utf8");
    // console.log("entered", req.body)
    const user = await User.findOne({
      attributes: [
        "id",
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
        "isNewUser",
      ],
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
    // const isSame = await bcrypt.compare(password, encrypted)

    if (password !== encrypted) {
      return res
        .status(401)
        .json({ sucess: false, message: "Incorrect Password" });
    }

    const privateKey = fs.readFileSync("./jwtRS256.key", "utf-8");

    if (user.isNewUser === undefined) {
      console.log("entered");

      await user.update({ isNewUser: null });

      let token = JWT.sign({ id: user.id }, "hello", {
        expiresIn: "1hr",
        algorithm: "HS256",
      });

      console.log(user.username);

      return res.json({
        sucess: true,
        data: {
          username: user.username,
          authtoken: token,
          firstLogin: true,
        },
      });
    } else {
      console.log("check1");
      let token = JWT.sign({ id: user.id }, "hello", {
        expiresIn: "1hr",
        algorithm: "HS256",
      });
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      // console.log("user", JSON.stringify(verify, null, 2));
      //  console.log(token);
      return res.json({
        sucess: true,
        data: {
          username: user.username,
          authtoken: token,
        },
      });
    }
  } catch (error) {
    res.status(500).send("Error" + error.message);
  }
};

module.exports = {
  signUp,
  Login,
};
