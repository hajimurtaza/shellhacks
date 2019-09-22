const mongoose = require('mongoose');
const User = require('./user');
// import Message from './message';
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
const models = { User };
export { connectDb };
export default models;