import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";
import log_read from "../../lib/logs/LOG_read";
import log_write from "../../lib/logs/LOG_write";
import createTable from "../../lib/database/query_pg/createTable";
import add from "../../lib/database/query_pg/add";
import get from "../../lib/database/query_pg/get";
var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

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
    const h_token = req.header("Authorization");
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    console.log(data);
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).send({ ok: false, data: ["TODO"] });
  }

  res.status(200).send({ ok: true, data });
}
