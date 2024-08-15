import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ sucess: false, message: "Unaturized - no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ sucess: false, message: "unaturize - invalid token" });
    console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in verifytoken", error.message);
    return res.status(400).json({success:false,message:error.message})
  }
};
