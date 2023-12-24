import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/logs.json`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});