// Este archivo esta solo a modo de prueba
const messagesList = {
  id:1,
  messages:
  [
    {
      id: 1,
      text: 'Probando Mensajes',
      timeStamp: '07/06/2022 16:15:40',
      author: {
        alias: 'Facu',
        surname: 'Villarroel',
        avatar: 'https://i.pinimg.com/564x/e9/57/2a/e9572a70726980ed5445c02e1058760b.jpg',
        age: 25,
        email: 'facu.villarroel96@gmail.com',
        name: 'Facundo'
      }
    },
    {
      id: 2,
      author: {
        name: 'emiliano',
        age: 31,
        email: 'emi@gmail.com',
        alias: 'Emi',
        avatar: 'https://i.pinimg.com/564x/64/3e/fe/643efe51394d635cbf544a25088ee269.jpg',
        surname: 'Bressan'
      },
      text: 'Segundo mensaje',
      timeStamp: '07/06/2022 16:36:04'
    },
    {
      text: 'Va queriendo funcionar!',
      author: {
        avatar: 'https://i.pinimg.com/564x/ed/be/19/edbe19b1fd4866b2d458aaabf8c02073.jpg',
        age: 28,
        email: 'Vicky@gmail.com',
        surname: 'Palma',
        name: 'Victoria',
        alias: 'Vicky'
      },
      id: 3,
      timeStamp: '07/06/2022 16:36:41'
    }
  ]
} 
const util = require('util');
function print(objeto) {console.log(util.inspect(objeto,false,12,true))}
const norm = require ("normalizr");

const authorSchema = new norm.schema.Entity("authors",{},{idAttribute:"email"})
const messageSchema = new norm.schema.Entity("messages",{
  author:authorSchema
})
const messagesListSchema = new norm.schema.Entity("messagesList",{
  messages: [messageSchema]
})

const normalizado = norm.normalize(messagesList, messagesListSchema)
const desnormalizado = norm.denormalize(normalizado.result, messagesListSchema, normalizado.entities)

console.log("Lenght NORMALIZADO",JSON.stringify(normalizado).length);
console.log("LENGTH DESNORMALIZADO",JSON.stringify(messagesList).length);
const normalizadoLength = JSON.stringify(normalizado).length
const desnormalizadoLength = JSON.stringify(messagesList).length
console.log("porcentaje:", ((normalizadoLength*100)/ desnormalizadoLength), "%");

/* print(normalizado)
console.log("Desnormalizado");
print(desnormalizado) */
