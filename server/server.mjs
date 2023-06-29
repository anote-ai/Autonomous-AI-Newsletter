import express from "express";
import { spawn } from "child_process";
const router = new express.Router();
import nodemailer from "nodemailer";
import csv from "csv-parser";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import HTML_TEMPLATE from "./mail-template.js";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(express.json());
app.use(router);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vidranatan@gmail.com",
    pass: "fhytlgpsjyzutlnm",
  },
});
console.log(process.env.EMAIL);

app.post("/send-email", upload.single("emailList"), async (req, res) => {
  const file = req.file;
  const { message } = req.body;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const mailOptions = {
    from: "<sender@gmail.com>",
    subject: "Your Newsletter",
    text: message,
    html: HTML_TEMPLATE(message),
  };

  try {
    fs.createReadStream(file.path) // Read the uploaded CSV file
      .pipe(csv())
      .on("data", async (row) => {
        const to = row.Email; // Assuming the email field is named "email" in the CSV
        mailOptions.to = to;

        try {
          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully to:");
        } catch (error) {
          console.log("Error sending email to:", error);
        }
      })
      .on("end", () => {
        console.log("All emails sent successfully");
        res.status(200).json({ message: "All emails sent successfully" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending emails" });
  }
});

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
  const key_word = req.query.key_word;

  executePython("./python/news.py", [key_word], res);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

export default app;
