let Contenedor = require("./backend.js")

const fs = require("fs")
// const path = require("path")

const express = require("express")
const app = express()
const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

        app.get('/', (req, res) =>{
            let dia = new Date()
            res.send(`<h1 style="color: red">¿Que día es hoy?</h1> <h3>Hoy es ${dia.toDateString()}  y son las ${dia.toLocaleTimeString()}</h3>`)
        })
        
        app.get('/productos', (req, res) =>{
            fs.readFile("./text.json" , "utf-8", (err, data)=>{
                if(err){
                    console.log("Error!!");
                }else{
                    let newArr = JSON.parse(data)
                    res.send(newArr)
                }
            })
            // res.sendFile(path.join(__dirname +  "/index.html"))
        })
        
        app.get('/productosRamdom', (req, res) =>{
            fs.readFile("./text.json" , "utf-8", (err, data)=>{
                if(err){
                    console.log("Error!!");
                }else{
                    let newArray = JSON.parse(data)
                    let ramdom = newArray[Math.floor(Math.random() * newArray.length)];
                    console.log(Math.floor(Math.random() * newArray.length));
                    res.send(ramdom)
                }
            // res.send({message : 'Estae FyH!'})
            })
        })
        

        let archivos = new Contenedor("text.json");

        const obj = {
            title: "Vasos",
            price: 150,
            img: "asdasd",
            id: numero()
        }
        
        function numero(){
            let num = Math.random()
            return num
        }
        
        // archivos.save(obj)
        // archivos.getById(0.013950166364724792)
        // archivos.getAll()
        // archivos.deleteById(0.013950166364724792)
        // archivos.deleteAll()