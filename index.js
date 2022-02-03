require('dotenv').config();
const { API_PORT } = process.env.PORT;
const port = API_PORT || 4000;
const app = require('./app');

// server created using express and running at port 3000 (mentioned in .env file at root location)
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});