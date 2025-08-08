import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import { googleUser } from "../models/google.models.js";

config();

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;

        // Buscar o crear usuario en tabla Google
        let usuario = await googleUser.findOne({ where: { googleId } });

        if (!usuario) {
          usuario = await googleUser.create({
            googleId,
            email,
            name,
          });
        }

        return done(null, usuario);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, type: "google" });
});

passport.deserializeUser(async (data, done) => {
  if (data.type === "google") {
    const usuario = await googleUser.findByPk(data.id);
    done(null, usuario);
  }
});
