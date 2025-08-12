import { tablauUsuarios } from "../models/usuario.model.js";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

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

    const match = await bcrypt.compare(loginPass, usuario.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Contraseña incorrecta",
        errorType: "wrong_password",
      });
    }

    req.login(usuario, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      res.status(200).json({
        success: true,
        message: "Sesión iniciada",
        data: {
          email: usuario.email,
          user: usuario.user,
        },
      });
    });

  } catch (error) {
    console.error("Error en Login:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
