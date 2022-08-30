const Knex = require("knex");

class Contenedor {

    constructor(options,table) {
        this.knex = Knex (options);
        this.table = table;
    }

    async getAll(){
        const allItems = await this.knex.from(this.table).select("*")
        return allItems
    }

    async getById(id){
        const item = await this.knex.from(this.table).select("*").where({"id":id})
        return item
    }

    async save(item){
        await this.knex(this.table).insert(item)
        console.log("item agregado");
    }

    async updateById(id,update){
        await this.knex(this.table).where({"id":id}).update(update)
    }

    async deleteById(id){
        await this.knex(this.table).where({"id":id}).del();
    }

    async deleteAll(){
        await this.knex(this.table).del();
    }
}

module.exports = Contenedor