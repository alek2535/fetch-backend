const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/rewardRoutes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Your Server is Running on PORT: ${PORT}`));
