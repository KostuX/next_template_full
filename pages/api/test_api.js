import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../config/session/session_config";

export default withIronSessionApiRoute(test, ironOptions);

async function test(req, res) {
    let data = req.body.data;
    req.session.test = {
      testData: data,
    };
    await req.session.save();
  
    res.status(200).send({ ok: true, data });
  }
