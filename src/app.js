import express from "express";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import "../middlewares/google.js";
import cors from "cors";
import router from "../routes/routes.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
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
app.use(router);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


export default app;