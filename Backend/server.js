import dotenv from "dotenv";
import { connectToDb } from "./src/config/database.js";
dotenv.config();
import app from "./src/app.js";

connectToDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(3000,()=>{
    console.log("server is running");
})