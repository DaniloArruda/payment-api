const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/pagamentoapi", { useNewUrlParser: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
requireDir("./src/model");

app.use("/pagamento-api", require("./src/routes"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port);