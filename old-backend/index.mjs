import app from './server.mjs'

const port = process.env.PORT || 3001;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);


// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
//   });
  
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });
