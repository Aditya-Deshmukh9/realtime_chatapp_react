import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed.", success: false });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token.", success: false });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
