
//import {onRequest} from "firebase-functions/v2/https";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { routes } from './routes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins: any = [
  "http://localhost:4200",
  "https://challenge-atom.web.app",
];

app.use(
  cors({
    origin: function (origin: any, callback) {
      // allow requests with no origin, ie. cURL
      // (like mobile apps or curl requests)
      origin = origin === "null" ? null : origin;
      if (!origin) return callback(null, true);
      // console.warn("CORS: ");
      // console.warn({origin});
      // console.warn({allowedOrigins});
      // console.log(allowedOrigins.indexOf(origin));

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

routes(app)

const PORT =  process.env.PORT || 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

//for firebase functions
//export const atomChallengeApi = onRequest(app);


