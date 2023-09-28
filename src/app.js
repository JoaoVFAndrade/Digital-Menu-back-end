const express = require('express');
const cors = require('cors');

const token = require('../src/middleware/jwtToken')
const routerUser = require('./routes/routerUser',token);
const routerMesa = require('./routes/routerMesa');
const routerItem = require('./routes/routerItem');
const routerCategoria = require('./routes/routerCategoria');
const routerProduto = require('./routes/routerProduto');
const routerPedido = require('./routes/routerPedido');
const routerRelatorio = require('./routes/routerRelatorio');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerMesa)
app.use(routerItem)
app.use(routerCategoria)
app.use(routerProduto)
app.use(routerPedido)
app.use(routerRelatorio)
app.use(routerUser);

module.exports = app;