import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session_config";


export default withIronSessionApiRoute(sessionMng, ironOptions);
async function sessionMng (req){

    const views = req.session.get('views') || 0;
    console.log(views)
   
}