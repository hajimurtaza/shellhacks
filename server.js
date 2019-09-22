const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users')
const app = express();

mongoose.connect('mongodb://localhost/shellhacks', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Connected to MondoDB...'))
  .catch(err => console.log('Cannot connect to MongoDB...', err))

  app.use(express.json())

  app.use('/api/users', users)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));