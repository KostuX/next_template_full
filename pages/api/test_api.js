import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";
import log_read from "../../lib/logs/LOG_read"
import log_write from "../../lib/logs/LOG_write"

export default withIronSessionApiRoute(test, ironOptions);

async function test(req, res) {
    let data = req.body.data;

    

    if(data === "Test Log"){
      console.log(data === "Test Log")
      let test = {type:'ERROR',data:data}
      log_write(test)
    let log = log_read('INFO')
    res.status(200).send({ ok: true, data:log });
    }
   
    req.session.test = {
      testData: data,
    };
    await req.session.save();
  
    res.status(200).send({ ok: true, data });
  }
