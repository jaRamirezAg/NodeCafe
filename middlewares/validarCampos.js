import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors });
  }

  next(); // Sigue con el siguiente middw. Si no hay, con el controlador
};

export default validarCampos;
