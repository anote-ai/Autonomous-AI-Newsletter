import express from "express";
import { spawn } from "child_process";
const router = new express.Router();
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());
app.use(express.json());
app.use(router);
dotenv.config();

const html = `
  <h1>Hi there</h1>
  <p>Thanks for subscribing to my newsletter</p>`;

async function main() {
  const transporter = nodemailer.createTestAccount({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "cebacaro@gmail.com",
    to: "cebacaro@gmail.com",
    subject: "Hello ✔",
    html: html,
  });
  console.log("Message sent: " + info.messageId);
}

const executePython = (script, args, res) => {
  const _arguments = args.map((arg) => arg.toString());
  const py = spawn("python3", [script, ..._arguments]);
  let outputData = "";
  let success = true;

  py.stdout.on("data", (data) => {
    outputData += data.toString();
  });

  py.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    success = false;
  });

  py.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      success = false;
      res.status(500).send("Python script exited with error");
    } else {
      if (success) {
        try {
          const resultData = JSON.parse(outputData);
          res.status(200).json({ data: resultData });
        } catch (error) {
          res
            .status(500)
            .send("Failed to parse output data from Python script");
        }
      }
    }
  });
};

app.get("/run-script", async (req, res) => {
  // Get the arguments from the query string or request body
  //   const key_word = req.body.key_word;
  const key_word = req.query.key_word;

  executePython(
    "/Users/cesarbacaro-ley/Desktop/WORK-FOLDER/Mpressed/Anote-AutonomousNewsletter/server/python/news.py",
    [key_word],
    res
  );
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

export default app;
