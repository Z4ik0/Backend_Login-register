export const Logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Sesión cerrada" });
    });
  });
};
