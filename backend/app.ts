import * as dotenv from "dotenv";
const express = require("express");
const app = express();
const cors = require("cors");

dotenv.config();

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10);
 
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});