const express = require('express');

const app = express();
const port = 3000;
const { routes } = require('./routes/routes');

app.use(express.json());

app.use('/api/', routes);

app.listen(port, () => {
  console.log(`WebServer listening at ${port}`);
});

module.exports = app;
