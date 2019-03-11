const express = require('express');
const routes = express.Router();

const CustomerController = require('./controller/CustomerController');
const PlanController = require('./controller/PlanController');

routes.get("/customer", CustomerController.index);
routes.get("/customer/:id", CustomerController.show);
routes.post("/customer", CustomerController.store);
routes.put("/customer/:id", CustomerController.update);
routes.delete("/customer/:id", CustomerController.delete);

routes.get("/plan", PlanController.index);
routes.get("/plan/:id", PlanController.show);
routes.post("/plan", PlanController.store);
routes.put("/plan/:id", PlanController.update);
routes.delete("/plan/:id", PlanController.delete);

module.exports = routes;