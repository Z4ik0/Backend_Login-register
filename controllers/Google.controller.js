// google.controller.js
import passport from "passport";

export const googleAuth = passport.authenticate("auth-google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

export const googleCallback = passport.authenticate("auth-google", {
  failureRedirect: "/login",
  successRedirect: "http://localhost:5173", // redirige al frontend
});

export const googleProfile = (req, res) => {
  if (!req.user) return res.status(401).json({ authenticated: false });
  res.json({
    authenticated: true,
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};

export const googleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.send({ message: "Logged out" });
    });
  });
};
