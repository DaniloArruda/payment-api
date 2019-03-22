const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://danilo:cuia1234@pagamento-cluster-vhk3r.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
requireDir("./src/model");

app.use("/", require("./src/routes"));

const port = process.env.PORT || 5000;
app.listen(port);