import mongoose from "mongoose";
import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    console.log("object");
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in userController@getUsersForSidebar", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
