import {MongoClient} from 'mongodb';
const url = "mongodb+srv://admin:admin@cluster0.g94atsv.mongodb.net/";
const options = {useNewUrlParser: true, useUnifiedTopology: true};
let connectDB;

if(process.env.NODE_ENV === 'development')
{
    // npm run dev 일때
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
}
else
{
    // npm run build 일때
    connectDB = new MongoClient(url, options).connect();
}

export {connectDB};