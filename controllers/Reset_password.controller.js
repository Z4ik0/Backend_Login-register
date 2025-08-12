import { tablauUsuarios } from "../models/usuario.model.js";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';

export const ResetPassword = async (req, res) => {
  const { token } = req.body;
  const { newPassword } = req.body;

  const user = await tablauUsuarios.findOne({
    where: {
      resetToken: token,
      resetTokenExpiry: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado", success: false});
  }

  const hashedPasswrod = await bcrypt.hash(newPassword, 10);


  user.password = hashedPasswrod;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.status(200).json({ message: "Contraseña actualizada correctamente", success: true });
};
