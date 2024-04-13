import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirm, gender } = req.body;

    if (password !== confirm) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    const user1 = await User.find({ username: null });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Invalid user data" });
    }
    // Generate JWT token
    generateTokenAndSetCookie(newUser._id, res);
    // console.log({newUser})
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error while signup", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = (req, res) => {
  res.send("login users");
};

export const logout = (req, res) => {
  res.send("logout users");
};
