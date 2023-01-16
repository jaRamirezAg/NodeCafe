import response from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import googleVerify from "../helpers/googleVerify.js";

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res
        .status(400)
        .json({ msg: "Usuario / Passowrd incorrectos - correo" });

    // si usuario activo
    if (!usuario.estado) return res.status(400).json({ msg: "Estado false" });

    // verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "Usuario / Passowrd incorrectos - passwd" });

    // generar JWT
    const token = generarJWT(usuario.id);

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo, rol } = await googleVerify(id_token);

    // comprobar si existe correo
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
        rol: rol || "USER_ROLE",
      };

      usuario = new Usuario(data);

      await usuario.save();
    }

    // Si el usuario en BD
    if (!usuario.estado)
      return res
        .status(401)
        .json({ msg: "Hable con el administrador, usuario bloqueado" });

    // Generar el JWT
    const token = generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    res.status(400).json({ ok: false, msg: "El token no se puede verificar" });
  }
};

export { login, googleSignIn };
