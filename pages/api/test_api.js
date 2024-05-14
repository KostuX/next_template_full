import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";
import log_read from "../../lib/logs/LOG_read"
import log_write from "../../lib/logs/LOG_write"

export default withIronSessionApiRoute(test, ironOptions);

async function test(req, res) {
    let data = req.body.data;    

    if(data === "Test Log"){  
      let test = {type:'ERROR',data:data}
      log_write(test)
    let log = await log_read('INFO')
    console.log(log)
    res.status(200).send({ ok: true, data:log });
    }
    else{
      req.session.test = {
        testData: data,
      };
      await req.session.save();
    }
   
   
  
    res.status(200).send({ ok: true, data });
  }
