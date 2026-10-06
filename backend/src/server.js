import app from "./app/app.js";
import { configs } from "./configs/config.js";
import { connectDb } from "./configs/db.js";

await connectDb()
const PORT = configs.PORT || 3000
app.listen(PORT,()=>{
  console.log("Server is running on port 3000");

})
