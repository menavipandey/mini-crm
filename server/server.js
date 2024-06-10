// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const audienceRoutes = require('./routes/audienceRoutes');
const campaignRoutes = require('./routes/campaignRoutes');


// server/server.js
const app = require('./app');
const PORT = process.env.PORT || 5000;


// mongoose.connect('mongodb://localhost:27017/mini-crm', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
  
  app.use(bodyParser.json());
  app.use('/api/audience', audienceRoutes);
  app.use('/api/campaign', campaignRoutes);
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
