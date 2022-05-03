import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from './routes';

const { json, urlencoded } = bodyParser;
const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/v1', (req, res) => {
  res.json('You have 2svc Api enpoints right here')
})
app.use('/v1', userRoutes(express))


app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(`server is running on port ${PORT}`);
});
