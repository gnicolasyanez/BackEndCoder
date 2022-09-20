const client = require("./twilio.js")
const transport = require("./transport")

const handleNewPurchase = (cart, username, email, phone) => {
    let li = ""
    cart.products.forEach(product => {
        li = li + `<li>${product.title} </li>`
    });

    transport.sendMail({
        from: "Facundo <facu.villarroel96@gmail.com>",
        to:process.env.GMAIL_USER,
        html:`<h1>List of items:</h1>
                <ul> 
                    ${li}
                </ul>`,
        subject:`New Purchase from the User: ${username}, Email: ${email}`
    }).then((data)=> {
        console.log("Email enviado");
    }).catch(console.log)
    
    client.messages.create({
        to:`whatsapp:${phone}`,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        body: `New Purchase from the User: ${username}, Email: ${email}`
    }).then((data) => {
        console.log("Whatsapp enviado correctamente");
    }).catch(console.log)
    
    client.messages.create({
        to: phone,
        from:process.env.TWILIO_PHONE_NUMBER,
        body:"Your purchase has been recieved"
    }).then((data) => {
        console.log("Mensaje de texto enviado correctamente");
    }).catch(console.log)
}

module.exports = handleNewPurchase