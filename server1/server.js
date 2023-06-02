const express= require('express');

const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const apiURL = 'https://api.wazirx.com/api/v2/tickers';
const cryptoDataSchema = new mongoose.Schema({
    name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String,
});

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);
mongoose.connect('mongodb://localhost/WazirX', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

app.get('/fetch-data', async (req, res) => {
  try {
    // Fetch data from the API
    const response = await axios.get(apiURL);
    const data = response.data;

    // Extract the top 10 results
    const top10Results = Object.values(data).slice(0, 10);
    console.log(top10Results);
    await CryptoData.insertMany(top10Results);

    res.status(200).json({ message: 'Data inserted into MongoDB successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }

    
});

app.get('/data',async (req, res) => {
    try {
        const posts = await CryptoData.find();
        res.json(posts);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

