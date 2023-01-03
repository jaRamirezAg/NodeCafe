import { Router } from "express";
import { check } from "express-validator";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
} from "../controllers/usuarios.js";
import {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} from "../helpers/dbValidators.js";
import validarCampos from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    //check("rol", "No es un rol válido").isIn("ADMIN_ROLE", "USER_ROLE"),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

export default router;
