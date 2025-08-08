import { tablauUsuarios } from "../models/usuario.model.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const ForgotPassword = async (req, res) => {
  try {
    const user = await tablauUsuarios.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res
        .status(404)
        .json({ 
          message: "No se encontró un usuario con ese correo.",
          success: false
        });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 1000 * 60 * 30;

    await user.update({
      resetToken: token,
      resetTokenExpiry: expires,
    });

    const transport = nodemailer.createTransport({
      service: "gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "ic3386941@gmail.com",
        pass: "iucm uxyj mdum lclf",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "ic3386941@gmail.com",
      subject: "Restablecimiento de Contraseña",
      text:
        `<div style="
    width: 500px;
    height: 800px;
    background-image: url('https://i.postimg.cc/W3dS9vyy/ffa85cdf-02ed-43bb-8a20-96273df31b7b.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  ">

    <div style="
      position: relative;
      z-index: 2;
      color: #fff;
      text-align: center;
      padding: 20px;
    ">

      <h1 style="margin-bottom: 30px; font-size: 28px;">Trocas San Juan</h1>

      <p style="font-size: 16px; line-height: 1.8; margin: 0 0 30px;">
        Hola <span style="color: #428ce2; font-weight: bold;">cliente</span>,<br>
        hemos recibido una solicitud para restablecer tu contraseña.
      </p>

      <p style="font-size: 16px; font-weight: bold; margin-bottom: 15px;">
        Para continuar, haz clic en el siguiente botón:
      </p>

      <a href="https://${req.headers.host}/Reset/${token}" style="
        display: inline-block;
        background-color: #428ce2;
        color: #fff;
        font-weight: bold;
        padding: 12px 30px;
        border-radius: 6px;
        text-decoration: none;
        font-size: 17px;
        margin-bottom: 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      ">
        Restablecer contraseña
      </a>

      <p style="
        font-size: 15px;
        color: rgba(255,255,255,0.85);
        margin-bottom: 60px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      ">
        Si no solicitaste este cambio, puedes ignorar este mensaje.<br>
        Tu contraseña actual seguirá siendo válida.
      </p>

      <p style="color: #428ce2; font-weight: bold; font-size: 16px;">
        Sistema de notificaciones<br>
        Trocas San Juan
      </p>

    </div>
  </div>
` 
       
    };
    /**`http://${req.headers.host}/reset/${token}\n\n` */
    await transport.sendMail(mailOptions);
    res.status(200).json({ message: "Correo de restablecimiento enviado.", success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor.", success: false });
  }
};
