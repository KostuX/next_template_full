import { transporter } from "../../config/email/connectGmail";
import log_write from "../logs/LOG_write";

export default async function sendMail(email, text) {
  let mailDetails = {
    from: "Template",
    to: email,
    subject: `Test email`,
    text: text,
  };

 await transporter.sendMail(mailDetails, function (err) {
    if (err) {
      console.log("Error sending email", err);
      log_write("ERROR", err);      
    } 
  });

}
