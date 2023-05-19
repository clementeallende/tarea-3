const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = new Sequelize({
  username: "allendeclemente@uc.cl",
  password: "19642997",
  database: "allendeclemente@uc.cl",
  host: "langosta.ing.puc.cl",
  dialect: "postgres",
  port: 5432
});

const Flow = require('./models/flow')(sequelize, Sequelize.DataTypes);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database and tables created!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

const app = express();
const port = 3000; // Set your desired port number

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(cors());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(bodyParser.json());

app.post('/flows', async (req, res) => {
  try {
    // Extract base64 encoded string from the request body
    const requestBody = req.body.message.data;
    
    // Decode the base64 string
    const decodedString = Buffer.from(requestBody, 'base64').toString('utf-8');

    // Extract data from the decoded string
    const operationType = parseInt(decodedString.substring(0, 4), 10);
    const messageId = parseInt(decodedString.substring(4, 14), 10);
    const sourceBank = parseInt(decodedString.substring(14, 21), 10);
    const sourceAccount = parseInt(decodedString.substring(21, 31), 10);
    const destinationBank = parseInt(decodedString.substring(31, 38), 10);
    const destinationAccount = parseInt(decodedString.substring(38, 48), 10);
    const amount = parseInt(decodedString.substring(48), 10);
    const publishtime = req.body.message.publishTime;

    // Create a new transaction using the Transaction model
    await Flow.create({
      operationType,
      messageId,
      sourceBank,
      sourceAccount,
      destinationBank,
      destinationAccount,
      amount,
      publishtime,
    });

    // Return the newly created transaction as the response
    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.sendStatus(500)
  }
});
