import passport from "passport";

export const googleAuth = () => {
  try {
    passport.authenticate("auth-google", {
      scope: ["profile", "email"],
      //este se pone para que google se forze a mostrar para seleccionar una cuentas para inicar sesion
      prompt: "select_account",
    });
  } catch (error) {
    console.log("Fallo en googleAuth: ", error);
  }
};

export const googleCallback = () => {
  try {
    passport.authenticate("auth-google", { failureRedirect: "/login" }),
      (req, res) => {
        res.redirect("http://localhost:5173/");
      };
  } catch (error) {
    console.log("Error en googleCallback: ", error);
  }
};

export const authProfile = (req, res) => {
  res.send(req.user || "No autenticado");
};

export const authLogout = (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.send({ message: "Logged out" });
      });
    });
  } catch (error) {
    console.log('Error rn authLogout: ', error);
  }
};
