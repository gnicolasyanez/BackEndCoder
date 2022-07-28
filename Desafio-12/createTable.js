const Knex = require ("knex").default

// DESCOMENTAR EL ESCRIPT DE LA TABLA A CREAR

// TABLA PARA LOS PRODUCTOS CON MYSQL2
/* const products = [
        {
            name: "Conjunto alternativo blanco", description: "Conjunto usado por el equipo Recreativo en ocasiones alternativas", code: "CoAlBl", price: 2000, thumbnail: "https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/conjuntoVarianteBlanco.jpeg?alt=media&token=e6a95478-f400-414f-b039-0dd987a32247", stock: 10, id: 1, timeStamp: "2022-06-07T16:37:59.711Z"
        },
        {
            name: "Pelota de fútbol kappa original", description: "Pelota de fútbol utilizado durante el torneo Campa 2022", code: "PeFuKaOr", price: 850, thumbnail: "https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/ball4.png?alt=media&token=422ec7cd-83a9-4720-ba3c-b50bd178c505", stock: 10, id: 2, timeStamp: "2022-06-07T16:38:08.419Z"
        },
        {
            name: "Buzo", description: "Buzo original del equipo Recreativo", code: "Bu", price: 1350, thumbnail: "https://firebasestorage.googleapis.com/v0/b/projectofinalreactjs.appspot.com/o/buzo.jpeg?alt=media&token=5703fe18-b50b-459f-9a51-98fe4cbb471c", stock: 10, id: 3, timeStamp: "2022-06-07T16:40:08.088Z"
        }
    ]

const options = {
    host: "127.0.0.1",
    user: "admin",
    password: "admin",
    database: "ecommerce"
}

const knex = Knex ({
    client:"mysql2",
    connection: options
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists("products")
    await knex.schema.createTable("products", (table) => {
        table.increments("id").primary().notNullable();
        table.string("timeStamp").notNullable();
        table.string("name", 30).notNullable();
        table.string("code", 10).notNullable();
        table.string("description", 50);
        table.string("thumbnail").notNullable();
        table.float("price");
        table.integer("stock");
    })
    await knex ("products").insert (products)
    console.log(await knex.from("products").select("*"));
    await knex.destroy();
}

ejecutar (); */



//TABLA PARA MENSAJES CON SQLITE3
const knex = Knex ({
    client:"sqlite3",
    connection: {filename:"./DB/ecommerce.sqlite"},
    useNullAsDefault:true
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists("messages")
    await knex.schema.createTable("messages", (table) => {
        table.string("email").notNullable();
        table.string("text").notNullable();
        table.string("timeStamp").notNullable();
    })

    await knex.destroy();
}

ejecutar ();