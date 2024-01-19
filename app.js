const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/', limits: { fileSize: 5 * 1024 * 1024 }});
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = 3000;

//Database Connection
const connectDB = require('./db');
connectDB();


//Middleware
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const bodyParserMiddleware = require('./middlewares/bodyParserMiddleware');

app.use(upload.single('profilePic'));
app.use(upload.any());
app.use(sessionMiddleware);
app.use(bodyParserMiddleware);
app.use(express.static('views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//Routes
const userRoute = require('./routes/user');
const { router: adminRoute, initializeAdmin } = require('./routes/admin'); 


app.use('/', userRoute);
app.use('/admin', adminRoute);

initializeAdmin();



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

