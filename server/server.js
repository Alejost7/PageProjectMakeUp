const express = require('express');
const cors = require('cors');
const path = require('path');
const productos = require('./productos');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para obtener los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Servidor abierto en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});