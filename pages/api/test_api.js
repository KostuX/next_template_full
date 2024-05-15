import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";
import log_read from "../../lib/logs/LOG_read";
import log_write from "../../lib/logs/LOG_write";
import createTable from "../../lib/database/query_pg/createTable";
import add from "../../lib/database/query_pg/add";
import get from "../../lib/database/query_pg/get";
import jwt from "jsonwebtoken";
import sendMail from "../../lib/email/email";
//const jwt = require("jsonwebtoken");

export default withIronSessionApiRoute(test, ironOptions);

async function test(req, res) {
  let data = req.body.data;

  if (data === "Test Log") {
    log_write("ERROR", data);
    let log = await log_read("ERROR");
    res.status(200).send({ ok: true, data: log.data });
  }
  if (data === "Test db") {
    let response = [];
    let a_res = "";
    let db_res = "";
    let c_res = await createTable();
    response.push("Create table if not exists: " + c_res.data.toString());
    if (c_res.ok) {
      a_res = await add("Test_1", "Test_2");
      response.push("Add test data: " + a_res.data.toString());
    }

    db_res = await get("Test_1");
    response.push("Get data:" + db_res.data.toString());

    res.status(200).send({ ok: a_res.ok, data: response });
  }
  if (data === "Test JWT") {
    let jwt_key = process.env.JWT_KEY;
    let jwt_exp = process.env.JWT_EXP;
    const token = jwt.sign({ userId: "user_id" }, jwt_key, {
      expiresIn: jwt_exp,
    });
    // const h_token = req.header("Authorization");
    // const decoded = jwt.verify(h_token, "your-secret-key");
    // req.userId = decoded.userId;
    res.status(200).send({ ok: false, data: [token] });
  }
  if (data === "Test Email") {
    await sendMail("goldiskiker@gmail.com", "Test Mail", (e)=>{
      if(e.ok){        
        res.status(200).send({ ok: false, data: [e.data] });
      }
    });
    
  }
  else{
    res.status(200).send({ ok: true, data });
  }

 
}
