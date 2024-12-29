//create a basic express server
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());
app.use('/api/details', require("./routes/detailsRoutes"));

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})