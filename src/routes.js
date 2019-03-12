const express = require('express');
const routes = express.Router();

const ClienteController = require('./controller/ClienteController');
const PlanoController = require('./controller/PlanoController');

routes.get("/cliente", ClienteController.index);
routes.get("/cliente/:id", ClienteController.show);
routes.post("/cliente", ClienteController.store);
routes.put("/cliente/:id", ClienteController.update);
routes.delete("/cliente/:id", ClienteController.delete);

routes.get("/plano", PlanoController.index);
routes.get("/plano/:id", PlanoController.show);
routes.post("/plano", PlanoController.store);
routes.put("/plano/:id", PlanoController.update);
routes.delete("/plano/:id", PlanoController.delete);

module.exports = routes;