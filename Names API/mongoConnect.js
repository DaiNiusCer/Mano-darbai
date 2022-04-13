import { MongoClient, ServerApiVersion } from 'mongodb';

//Mongo DB kliento pakūrimas pradžia
const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
//Gaunamas asinchroninė funkcija, promisas, todėl jeigu norime, kad atvaizduotų reikia pasirašyti asinchroninę funckiją:
client.connect()



//Mongo DB kliento pakūrimas pabaiga


//Eksportuojam kaip modulį
export default client;