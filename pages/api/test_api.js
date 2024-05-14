import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";
import { log_read } from "../../lib/logs/LOG_read"
import log_write from "../../lib/logs/LOG_write"

export default withIronSessionApiRoute(test, ironOptions);

async function test(req, res) {
    let data = req.body.data;

    

    if(data === "Read Log"){
      console.log(data === "Read Log")
      log_write(data)
    }
   
    req.session.test = {
      testData: data,
    };
    await req.session.save();
  
    res.status(200).send({ ok: true, data });
  }
