const calcRandomNumbers = (quantity) => {
  
  let numbers = {}
  
  for (let i = 0; i < quantity; i++) {
    const randomNumber = Math.floor(Math.random() * 1000 +1)
    const numberKey = randomNumber.toString()
    
    if (numbers[numberKey]){
      numbers[numberKey] ++
    } else {
      numbers[numberKey] = 1
    }
  }

  return numbers
}

module.exports = {calcRandomNumbers}