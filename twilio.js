require("dotenv").config();

const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const twilioWhatsapp = process.env.TWILIO_WHATSAPP_NUMBER
const twilioPhone = process.env.TWILIO_PHONE_NUMBER
const adminNumber = process.env.ADMIN_NUMBER


//SENDING MESSAGE
/* client.messages.create({
  to: adminNumber,
  from:twilioPhone,
  body:"Cuerpo del mensaje"
}).then((data) => {
  console.log("Mensaje de texto enviado correctamente");
}).catch(console.log) */


// SENDING WHATSAPP MESSAGE
/* client.messages.create({
  to:`whatsapp:${adminNumber}`,
  from: `whatsapp:${twilioWhatsapp}`,
  body: "Probando (Cuerpo del mensaje)"
}).then((data) => {
  console.log("Whatsapp enviado correctamente");
}).catch(console.log) */

module.exports = client 