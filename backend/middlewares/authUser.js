import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized login again with token",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next()
    // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
    //     // assigning user id from token into body 
    //   req.body.userId = token_decode.id;
    // next();

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
