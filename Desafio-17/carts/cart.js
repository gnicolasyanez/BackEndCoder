
class Cart {
  constructor (dto){
    this.id = dto.id
    this.timeStamp = dto.timeStamp
    this.products = dto.products
  }

  static fromDto(dto) {
    const cart = new Cart();
    cart.id = dto.id
    cart.timeStamp = dto.timeStamp
    cart.products = dto.products
    
    return cart
  }

  toDto() {
    const {id, timeStamp, products } = this
    
    return{
      id, 
      timeStamp,
      products
    }
  }
}

module.exports = {Cart}