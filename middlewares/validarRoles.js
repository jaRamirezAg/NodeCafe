const esAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res
      .status(500)
      .json({ msg: "Se quiere verificar el role sin validar el token" });
  }

  const { rol, nombre } = req.usuario;

  if (!rol !== "ADMIN_ROLE")
    return res.status(401).json({ msg: `El ${nombre} no es administrador` });

  next();
};

const tieneRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res
        .status(500)
        .json({ msg: "Se quiere verificar el role sin validar el token" });
    }

    if (!roles.includes(req.usuario.rol))
      return res
        .status(401)
        .json({ msg: `Se quiere tener uno de estos roles ${roles}` });

    next();
  };
};

export { esAdminRole, tieneRole };
