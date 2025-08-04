import { tablauUsuarios } from "../models/usuario.js";

export const Register = async (req, res) => {
  try {
    const { registerUser, registerPass, registerEmail } = req.body;

    // Validar que no exista usuario/email duplicado
    const existEmail = await tablauUsuarios.findOne({
      where: {
        email: registerEmail,
      }
    })

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

    if(existUser){
      return res.status(400).json({
        success: false,
        message: "El usuario ya existe intenta con otro",
        errorType: "Already_user_exist"
      })
    }

    // Crear nuevo usuario
    const newUser = await tablauUsuarios.create({
      user: registerUser,
      email: registerEmail,
      password: registerPass,
    });

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: {
        user: newUser.user,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error en Register:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
