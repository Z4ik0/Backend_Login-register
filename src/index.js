import express from "express";
import passport from "passport";
import session from "express-session";
import "../middlewares/google.js";
import cors from "cors";

const app = express();

app.use(
  session({
    secret: "secreto_super_seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get(
  "/auth/google",
  passport.authenticate("auth-google", {
    scope: ["profile", "email"],
    //este se pone para que google se forze a mostrar para seleccionar una cuentas para inicar sesion
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("auth-google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
  }
);

app.get("/auth/profile", (req, res) => {
  res.send(req.user || "No autenticado");
});

app.get("/auth/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.send({ message: "Logged out" });
    });
  });
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
