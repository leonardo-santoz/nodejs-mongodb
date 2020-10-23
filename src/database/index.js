import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://kh4rzpt:<kh4rzpt>@cluster0.iddca.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useMongoClient: true});

mongoose.Promise = global.Promise;


module.exports = mongoose;