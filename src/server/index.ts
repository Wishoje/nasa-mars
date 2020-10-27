import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from 'axios';

const buildDir = path.join(process.cwd() + "/build");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(buildDir));
const nasaApiKey ="ddqeJHge1uhGZnwiT3aRVzn5sLfbxyr2YXaHp7Eb"

async function getMastCamera() {
  return axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=MAST&page=1&api_key=${nasaApiKey}`);
}

app.get('/getAllCameras', async function (req, res) {
  try {
    const apiData = await getMastCamera();
    const responseBody = {
      content: apiData.data
    }
    res.status(200).json(responseBody);
  } catch(e) {
    console.log(e.stack)
    res.status(500).send({error: e.message})
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
