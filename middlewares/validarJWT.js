import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({ msg: "No hay token en la petición" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario)
      return res
        .status(401)
        .json({ msg: "Token no valido - usuario no existe" });

    //Verificamos si el usuario ha sido eliminado
    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "Token no valido - usuario con estado false" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};

export default validarJWT;
