import express from 'express';
import bodyParser from "body-parser";
import cors from "cors"


const {json, urlencoded } = bodyParser;
const app = express();
require('./routes')(app);
const PORT = process.env.PORT

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.send('hello there')
})

app.listen(PORT, (err) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log(`server is running on port ${PORT}`);
  });