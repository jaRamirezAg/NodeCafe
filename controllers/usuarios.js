import response from "express";
import request from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({ estado: true }),
      Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({ total, usuarios });
  } catch (error) {
    res.status(400).json({ msg: "Error al leer usuarios" });
  }
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Hash de la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  try {
    const usuarioAlmacenado = await usuario.save();

    res.json(usuarioAlmacenado);
  } catch (error) {
    res.status(400).json({ msg: "Error al guardar usuario en bd" });
  }
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if (password) {
    // Hash de la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // Actualizar en BD
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // const usuarioActualizado = await Usuario.findById(id);

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar usuario" });
  }
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuarioAutenticado = req.usuario;
  res.json(usuario);
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
