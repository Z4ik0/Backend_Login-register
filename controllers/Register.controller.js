import { tablauUsuarios } from "../models/usuario.model.js";

export const Register = async (req, res) => {
  try {
    const { registerUser, registerPass, registerEmail } = req.body;

    // Validar que no exista usuario/email duplicado
    const existEmail = await tablauUsuarios.findOne({
      where: {
        email: registerEmail,
      },
    });

    const existUser = await tablauUsuarios.findOne({
      where: {
        user: registerUser,
      },
    });

    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "El correo ya ah sido registrado",
        errorType: "Already_email_exist",
      });
    }

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe intenta con otro",
        errorType: "Already_user_exist",
      });
    }

    // Crear nuevo usuario
    const newUser = await tablauUsuarios.create({
      user: registerUser,
      email: registerEmail,
      password: registerPass,
    });

    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al iniciar sesión" });
      }
      res.status(200).json({
        success: true,
        message: "Sesión iniciada",
        data: {
          email: newUser.email,
          user: newUser.user,
        },
      });
    });
  } catch (error) {
    console.error("Error en Register:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
