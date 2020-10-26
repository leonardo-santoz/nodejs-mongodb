const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://kh4rzpt:kh4rzpt@cluster0.iddca.mongodb.net/<dbname>?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;