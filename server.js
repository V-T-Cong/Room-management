require("dotenv").config({ path: "./.env" });
const app = require('./src/app');

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
    console.log(`App start in port: ${PORT}`);
}); 