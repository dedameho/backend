const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());

//routes
app.use(require('./routes/auth/auth'));
app.use(require('./routes/add/add'));
app.use(require('./routes/listar/listar'));
app.use(require('./routes/eliminar/eliminar'));

app.listen(3050,(console.log('Running on port 3050')));