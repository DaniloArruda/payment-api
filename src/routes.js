const express = require('express');
const routes = express.Router();

const ClienteController = require('./controller/ClienteController');
const PlanoController = require('./controller/PlanoController');
const PagamentoController = require('./controller/PagamentoController');
const UsuarioController = require('./controller/UsuarioController');

const authMiddleware = require('./middlewares/auth');

routes.post("/usuario/registrar", UsuarioController.registrar);
routes.post("/usuario/autenticar", UsuarioController.autenticar);

routes.use(authMiddleware);
routes.get("/cliente", ClienteController.index);
routes.get("/cliente/:id", ClienteController.show);
routes.post("/cliente", ClienteController.store);
routes.put("/cliente/:id", ClienteController.update);
routes.delete("/cliente/:id", ClienteController.delete);
routes.get("/cliente/quantidade", ClienteController.count);

routes.get("/plano", PlanoController.index);
routes.get("/plano/:id", PlanoController.show);
routes.post("/plano", PlanoController.store);
routes.put("/plano/:id", PlanoController.update);
routes.delete("/plano/:id", PlanoController.delete);

routes.post("/pagamento", PagamentoController.store);


module.exports = routes;
