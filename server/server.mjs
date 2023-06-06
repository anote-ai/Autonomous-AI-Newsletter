import express from "express";
import { spawn } from "child_process";

const app = express()
app.use(express.json());

const executePython = (script, args, res) => {
    const _arguments = args.map(arg => arg.toString())
    const py = spawn('python', [script, ..._arguments])
    let outputData = '';
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
                    res.status(200).json(resultData);
                } catch (error) {
                    res.status(500).send("Failed to parse output data from Python script");
                }
            }
        }
    });
}


app.get('/run-script', async (req, res) => {
    // Get the arguments from the query string or request body
    const key_word = req.body.key_word;
    executePython("./python/news.py", [key_word], res);
})


export default app;
