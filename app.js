require("dotenv").config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const userRouter = require("./api/users/user.router");
app.use(express.json());
app.use("/api/users", userRouter);

// app.get("/api", (req, res) => {
//     res.json({
//         success: 1,
//         messages: "this is rest api working !!!"
//     });
// });

app.use("/api/users", userRouter);
app.listen(process.env.APP_PORT, () => {
    console.log('server up and runnig on port number:', process.env.APP_PORT);

});