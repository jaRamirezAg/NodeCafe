import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRoleValido = async (rol = "") => {
  try {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
  } catch (error) {
    throw error;
  }
};

const emailExiste = async (correo = "") => {
  try {
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo)
      throw new Error(`El correo ${correo} ya existe en la base de datos`);
  } catch (error) {
    throw error;
  }
};

const existeUsuarioPorId = async (id = "") => {
  try {
    const existeUsuario = await Usuario.findById({ id });
    if (!existeUsuario)
      throw new Error(`El id ${id} no existe en la base de datos`);
  } catch (error) {
    throw error;
  }
};

export { esRoleValido, emailExiste, existeUsuarioPorId };
