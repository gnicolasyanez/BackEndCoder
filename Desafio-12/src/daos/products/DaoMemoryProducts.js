const MemoryContainer = require("../../containers/MemoryContainer.js");

class DaoMemoryProducts extends MemoryContainer {
  constructor() {
    super();
  }

  async save(item){
    this.arrayInMemory.push({...item, id: MemoryContainer.contadorId});
    MemoryContainer.contadorId ++;
  }

  async getById(idNumber){   
    return(this.arrayInMemory.find(prod => prod.id === idNumber) )
  }

  async getAll(){
    return(this.arrayInMemory)
  }

  async modifyProduct(idNumber,productUpdate) {
    const oldProduct = this.arrayInMemory.find(prod => prod.id === idNumber);
    const indexProduct = this.arrayInMemory.findIndex((product) => product.id === idNumber);
    const UpdatedProduct = {...oldProduct, ...productUpdate}
    this.arrayInMemory.splice(indexProduct,1, UpdatedProduct)
    return("Producto Actualizado Correctamente")
  }

  async deleteById(idNumber){
    this.arrayInMemory = this.arrayInMemory.filter(prod => prod.id !== idNumber);
    return ("Producto Eliminado Correctemente")
  }

  async deleteAll(){
    this.arrayInMemory = [];
    return ("Productos Eliminados Correctemente")
  }

}

module.exports = DaoMemoryProducts