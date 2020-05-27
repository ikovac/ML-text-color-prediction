const express = require('express');
const predictRouter = require('./routes/predict');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());       // to support JSON-encoded bodies
app.use('/', predictRouter);

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
