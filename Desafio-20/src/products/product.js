
class Product {
  constructor (dto){
    this.title = dto.title
    this.description = dto.description
    this.price = dto.price
    this.thumbnail = dto.thumbnail
    this.stock = dto.stock
    this.code = dto.code
    this.id = dto.id
    this.timeStamp = dto.timeStamp
  }

  static fromDto(dto) {
    const prod = new Product();
    prod.title = dto.title
    prod.description = dto.description
    prod.price = dto.price
    prod.thumbnail = dto.thumbnail
    prod.stock = dto.stock
    prod.code = dto.code
    prod.id = dto.id
    prod.timeStamp = dto.timeStamp
    
    return prod
  }

  toDto() {
    const {title, description, price, thumbnail, stock, code, id, timeStamp} = this
    
    return{
      title,
      description, 
      price, 
      thumbnail, 
      stock, 
      code, 
      id, 
      timeStamp
    }
  }
}

module.exports = {Product}