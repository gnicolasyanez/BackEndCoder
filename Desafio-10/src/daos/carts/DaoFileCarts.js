const FileContainer = require("../../containers/FileContainer");
const fs = require ("fs");

class DaoFileCarts extends FileContainer {
  constructor() {
    super("carts.txt");
    this.arrayCarts = [];
  }

  async prevContent (){
    try{
        this.arrayCarts = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
        let lastIdNumber = this.arrayCarts[this.arrayCarts.length -1].id
        FileContainer.contadorId = lastIdNumber+1
    }
    catch(err){
    console.log(err);
        this.arrayCarts = []
        console.log("no existe un contenido previo");
    }
}

  async getById(id){
    await this.prevContent();
    try{
      const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
      let cartToUpdate = contenido.find((item) => item.id === id)
      if (cartToUpdate === undefined){
          cartToUpdate = null
      }
      return(cartToUpdate);
  }
  catch(err){
      console.log("Error en la búsqueda del carrito",err);
  }
  }

  async save(item){
    await this.prevContent();
    item.id = FileContainer.contadorId;
    this.arrayCarts.push(item)
    FileContainer.contadorId ++
    try{
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayCarts,null,2));
        return(item)
    }
    catch (err) {
        console.log("Error en escritura;",err);
    } 
  }

  async deleteById(id){
    await this.prevContent();
    try{
      this.arrayCarts = this.arrayCarts.filter((prod) => prod.id !== id)
      await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayCarts,null,2)) 
      console.log("Nueva lista de carrito ",this.arrayCarts);
    }
    catch(err){
        console.log("Error al eliminar un carrito",err);
    }
  }

  async addProductToCart(id, productToAdd){
    await this.prevContent();
    try{
      const cartIndex = this.arrayCarts.findIndex((cart) => cart.id === id);
      const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"));
      let cartToUpdate = contenido.find((item) => item.id === id);
      cartToUpdate.products.push(productToAdd);
      this.arrayCarts.splice(cartIndex,1,cartToUpdate);
      await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayCarts,null,2));

  }
  catch(err){
      console.log("Error agregando el producto al carrito",err);
  }
  }

  async deleteProductFromCart (id, idProd){
    try {
      await this.prevContent();
      const cartIndex = this.arrayCarts.findIndex((cart) => cart.id === id);
      const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"));
      const oldCart = contenido.find((item) => item.id === id);
      const productsArray = oldCart.products.filter(prod => prod.id !== idProd)
      const updatedCart = {...oldCart, products:productsArray}
      this.arrayCarts.splice(cartIndex,1,updatedCart);
      await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayCarts,null,2));
      
    } catch (err) {
      console.log("Error en la eliminacion del producto",err);
    }
  }
}

module.exports = DaoFileCarts;
