import jwt from "jsonwebtoken";

const generarJWT = (uid = "") => {
  return jwt.sign({ uid }, process.env.SECRETPRIVATEKEY, {
    expiresIn: "4h",
  });
};

export default generarJWT;
