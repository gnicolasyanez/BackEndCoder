const {calcRandomNumbers} = require("./calcRandomNumbers");

process.on("message", (msg) => {
    const quantity = parseInt(msg)
    const numbers = calcRandomNumbers(quantity);
    process.send(numbers)

})