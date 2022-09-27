const  { expect }  = require ("chai");
const supertest = require ("supertest");

const app = require("../server.js")

const request = supertest(app)

describe("API Rest Test", () => {

  describe("Productos", () => {

    describe("Successfull Cases", () => {
      
      describe("Get All, Get By ID", () => {
        it("Should respond with the list of Products (array of objects)", async () => {
          const response = await request.get("/api/productos");
          expect(response.body).to.be.an("array").and.to.not.have.lengthOf(0).and.includes.an("object")
        })
  
        it("Should return a single object with id 1", async () => {
          const response = await request.get("/api/productos/1")
          expect(response.body).to.be.an("object").and.includes({id:1})
        })
      })
  
      describe("Put, Modify Product", () => {
        it("Should response with the updated product" , async () => {
          const productToAdd = {
            price:1350,
            stock:50
          }
          const response = await request.put("/api/productos/3").send(productToAdd)
          expect(response.body).to.include(productToAdd)
        })
        
      })
  
      describe("Post", () => {
        it("Should return the product added and its id" , async () => {
          const productToAdd = {
            title:"titulo test",
            description:"description test",
            code:"test 1",
            price:100,
            thumbnail:"req.body.thumbnail",
            stock:100
          }
          const response = await request.post("/api/productos").send(productToAdd)
          expect(response.body).to.includes(productToAdd).and.to.have.property("id")
        })
      })
  
      describe('Delete by id', () => { 
        it("Should return 'successfully deleted'", async () => {
          const response = await request.delete("/api/productos/4")
          expect(response.text).to.eq("successfully deleted")
        })
      })

    })

    describe("Error Cases:", () => {

      describe("Get By ID an Non-existent product" , () => {

        it("Should throw an error, 'No existe producto con ese id'", async () => {
          const response = await request.get("/api/productos/1000")
          expect(response.status).to.eq(404)
          expect(response.text).to.eq("No existe producto con ese id")
        })
      })

      describe("Get By Id passing a character that is not a number", () => {
        it("Should throw an error 'El ID debe ser un numero'", async () => {
          const response = await request.get("/api/productos/notANumber")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("El ID debe ser un numero")
        })
      })

      describe('Post with empty product', () => { 
        it("Should throw an error 400 'Faltan propiedades al producto'", async () => {
          const response = await request.post("/api/productos")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("Faltan propiedades al producto")
        })
      })

      describe('put with empty product', () => { 
        it("Should throw an error 400 'Product to update no puede ser 'undefined''", async () => {
          const response = await request.put("/api/productos/1")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("Product to update no puede ser 'undefined'")
        })
      })

      describe("delete an non-existent product", () => {
        it("Should return an error 400 'No existe producto con ese id", async () => {
          const response = await request.delete("/api/productos/1000")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("No existe producto con ese id")
        })
      })


    })
  })

  describe("Carritos", () => {

    describe("Successfull Cases", () => {

      describe("Get Carrito", () => { 
        it("should return the products of the cart (array)", async () => {
          const response = await request.get("/api/carrito/1/productos")
          expect(response.body).to.be.an("array")
        })
      })

      describe("Post carrito", () => { 
        it("should return the id of the new cart", async () => {
          const response = await request.post("/api/carrito")
          expect(response.body).to.be.a("object").and.to.haveOwnProperty("id")
        })
      })
      
      describe("Post carrito Producto", () => {
        it("Should return the cart new list of products", async () => {
          const productToAdd = {
            title: "Conjunto alternativo blanco",
            description: "Conjunto usado por el equipo Recreativo en ocasiones alternativas",
            code: "CoAlBl",
            price: 2000,
            thumbnail: "https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/conjuntoVarianteBlanco.jpeg?alt=media&token=e6a95478-f400-414f-b039-0dd987a32247",
            stock: 10,
            id: 3,
            timeStamp: "2022-06-07T16:37:59.711Z"
          }
          const response = await request.post("/api/carrito/7/productos").send(productToAdd)
          expect(response.body).to.be.an("array").and.to.not.have.lengthOf(0)
        })
      })

      describe("Delete Producto de carrito", () => { 
        it("Should return 'Producto eliminado correctamente del carrito'", async () => {
          const response = await request.delete("/api/carrito/7/productos/3")
          expect (response.text).to.eq("Producto eliminado correctamente del carrito")
        })
      })

      describe("Delete carrito", () => { 
        it("Should return 'Carrito eliminado correctamente'", async () => {
          const response = await request.delete("/api/carrito/7")
          expect(response.text).to.eq("Carrito eliminado correctamente")
        })
      })

    })

    describe("Error Cases", () => {

      describe("Get Carrito passing a character that is not a number", () => {
        it("Should throw an error 'El ID debe ser un numero", async () => {
          const response = await request.get("/api/carrito/NotANumber/productos")
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("Should throw an error 'El ID debe ser un numero")
        })
      })

      describe("Get a non-existent cart", () => { 
        it("Should throw an error, 'No existe carrito con ese id", async () => {
          const response = await request.get("/api/carrito/1000/productos")
          expect(response.status).to.eq(404)
          expect(response.text).to.eq("No existe carrito con ese id")
        })
      })

      describe('Post an empty product to the cart', () => { 
        it("Should response a 400 with the text 'El producto no puede ser undefined'", async () => {
          const response = await request.post("/api/carrito/1/productos").send()
          expect(response.status).to.eq(400)
          expect(response.text).to.eq("El producto no puede ser undefined")
        })
      })
    })
  })
})