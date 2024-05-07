import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session_config";

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res, session) {
  // await res.status(200).json(req.session);
  console.log("Session destroyed");
  req.session = {};
  res.setHeader("cache-control", "no-store, max-age=0");
  await req.session.save();
  await req.session.destroy();

  await res.send({ ok: true });
}
