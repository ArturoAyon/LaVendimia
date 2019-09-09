const express = require('express');
const connectDB = require('./config/db');

const app = express();
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/clients', require('./routes/api/clients'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/configurations', require('./routes/api/configurations'));
app.use('/api/sales', require('./routes/api/sales'));

//app.use('/api/config', require('./routes/api/config'));
/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
