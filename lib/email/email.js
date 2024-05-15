import { transporter } from "../../config/email/connectGmail";
import log_write from "../logs/LOG_write";

export default async function sendMail(email, text, cb) {
  let mailDetails = {
    from: "Template",
    to: email,
    subject: `Test email`,
    text: text,
  };

  transporter.sendMail(mailDetails, function (err) {
    if (err) {
      console.log("Error sending email", err);
      log_write("ERROR", err);
      cb({ ok: true, data: err.toString() });
    } else {
      cb({ ok: true, data: "Email sent." });
    }
  });
}
