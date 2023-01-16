import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn } from "../controllers/auth.js";
import validarCampos from "../middlewares/validarCampos.js";

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La password es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty(), validarCampos],
  googleSignIn
);

export { router as routerAuth };
