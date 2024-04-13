import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Generate JWT token with userId payload, using JWT_SECRET and setting expiry to 15 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set the JWT token as a cookie in the response object
  res.cookie("jwt", token, {
    // Set the cookie's maximum age to 15 days in milliseconds
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // Ensure that the cookie is only accessible through HTTP requests (not JavaScript)
    httpOnly: true,
    // Enforce strict SameSite policy to prevent CSRF attacks
    sameSite: "strict",
    // Boolean value indicating if the cookie should only be sent over HTTPS
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
