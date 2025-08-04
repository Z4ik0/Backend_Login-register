import { tablauUsuarios } from "../models/usuario.js";
import { Op } from "sequelize";

export const Login = async (req, res) => {
  try {
    const { loginUser, loginPass } = req.body;

    // 1. Buscar usuario por username O email
    const usuario = await tablauUsuarios.findOne({
      where: {
        [Op.or]: [{ user: loginUser }, { email: loginUser }],
      },
    });

    // 2. Validaciones
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario o correo no encontrado",
        errorType: "user_not_found",
      });
    }

    if (usuario.password !== loginPass) {
      return res.status(400).json({
        success: false,
        message: "Contraseña incorrecta",
        errorType: "wrong_password",
      });
    }

    // 3. Éxito
    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: {
        user: usuario.user,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Error en Login:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
