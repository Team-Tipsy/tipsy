const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const drinksRouter = require('./router');
const faveRouter = require('./faveRouter');
const recipeRouter = require('./recipeRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', drinksRouter);
app.use('/faves', faveRouter);
app.use('/recipes', recipeRouter);


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) =>
  res.status(404).send("Go home Rebecca, you're drunk")
);

// production build static serve..ask about get request
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// universal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (err, res) => {
  if (err) console.log(err);
  else console.log('Server is listening on:', `http://localhost:${PORT}`);
});
