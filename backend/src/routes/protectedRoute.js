import express  from "express";
// import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.get("/test", (req, res) => {
  
  res.json({ message: "You are accessing a protected route!" });
});

export default  router;
