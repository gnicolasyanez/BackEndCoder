const { error } = require("console");
const fs = require ("fs")
const FileContainer = require("../../src/containers/FileContainer.js")

class DaoFileProducts extends FileContainer {

constructor() {
    super("products.txt");
    this.arrayProducts= [];
}

async prevContent (){
    try{
        this.arrayProducts = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
        let lastIdNumber = this.arrayProducts[this.arrayProducts.length -1].id
        FileContainer.contadorId = lastIdNumber+1
        console.log("Contenido previo cargado correctamente");
    }
    catch(err){
    console.log(err);
        this.arrayProducts = []
        console.log("no existe un contenido previo");
    }
}

async save(item){
    await this.prevContent();
    item.id = FileContainer.contadorId;
    this.arrayProducts.push(item)
    FileContainer.contadorId ++
    try{
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts,null,2));
        return(item)
    }
    catch (err) {
        console.log("Error en escritura;",err);
    } 
}

async getById(idNumber){   
    try{
        const contenido = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
        let productFound = contenido.find((prod) => prod.id === idNumber)
        if (productFound === undefined){
            productFound = null
        }
        return(productFound);
    }
    catch(err){
        console.log("Error en la búsqueda del producto",err);
    }
}

async getAll(){
    try{
        const allProducts = JSON.parse(await fs.promises.readFile(this.fileName,"utf-8"))
        return(allProducts);
    }
    catch(err){
        console.log("Error en la obtención de productos",err);
    }
}

async modifyProduct(idNumber,productUpdate) {
    try{
        const productIndex = this.arrayProducts.findIndex((product) => product.id === idNumber)
        const oldProduct = this.arrayProducts.find((product) => product.id === idNumber)
        const UpdatedProduct = {...oldProduct, ...productUpdate}
        this.arrayProducts.splice(productIndex,1,UpdatedProduct)
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts,null,2));
        return ("producto actualizado correctamente")
    }
    catch(err){
        return new error("Error en la actualización del producto",err);
    }
}

async deleteById(idNumber){
    try{
        this.arrayProducts = this.arrayProducts.filter((prod) => prod.id !== idNumber)
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts,null,2)) 
        console.log("Nueva lista de productos",this.arrayProducts);
    }
    catch(err){
        console.log("Error al eliminar un producto",err);
    }
}

async deleteAll(){
    try{
        this.arrayProducts = []
        await fs.promises.writeFile(this.fileName,JSON.stringify(this.arrayProducts))
        console.log("Productos Eliminados");
    }
    catch(err){
        console.log("Error al eliminar todos los productos",err);
    }
}

}

module.exports = DaoFileProducts