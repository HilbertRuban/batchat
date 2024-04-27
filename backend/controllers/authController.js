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
    console.log("Error while signup authController@signup", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log({user});
    if (!user) {
      return res.status(404).json({
        error: "Invalid username or password",
      });
    }
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error while login authController@login", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error while login authController@logout", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
