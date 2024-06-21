const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const mysql = require('mysql2/promise');
const app = express();

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

