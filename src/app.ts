import express from "express";
import adminRouter from "./router/admin";
import customerRouter from "./router/customer";
import bodyParser from "body-parser";
import { connect } from "./config/connect_db";

const app = express();

// connect db
connect();

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

//config router
app.use("/admin", adminRouter);
app.use("/customer", customerRouter);

app.listen(3000, () => {
  console.log("server is running http://localhost:3000/");
});
