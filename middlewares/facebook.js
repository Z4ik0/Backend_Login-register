import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { facebookUser } from '../models/facebook.models.js';
import { config } from "dotenv";


config();

passport.use(
  "auth-facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let usuario = await facebookUser.findOne({
          where: { facebookId: profile.id }
        });

        if (!usuario) {
          usuario = await facebookUser.create({
            facebookId: profile.id,
            nombre: profile.displayName,
            email: profile.emails?.[0]?.value || null,
            foto: profile.photos?.[0]?.value || null
          });
        }

        return done(null, usuario);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
