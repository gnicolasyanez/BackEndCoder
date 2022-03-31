class usuario {
    constructor(name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }
}
    usuario.prototype.getFullName = function () {
        return "".concat(this.name, ` `).concat(this.lastname);
    };
    usuario.prototype.addPet = function (pet) {
        this.pets.push(pet);
    };
    usuario.prototype.countPets = function () {
        return this.pets.length;
    };
    usuario.prototype.addBook = function (book, author) {
        this.books.push({ book: book, author: author });
    };
    usuario.prototype.getBookNames = function () {
        return this.books.map(function (bk) { return bk.book; });
    };
    
let user = new usuario("Nicolas", "Yañez", [
    { book: `Don quijote de la mancha`, author: `Miguel de Cervantes` },
    { book: `Harry Potter`, author: `J K Rowling` },
], [`Dog`, `Cat`]);
console.log(user.getFullName());
console.log(user.countPets());
console.log(user.getBookNames());

user.addBook(`El señor de los anillos`, `Tolkien`);

user.addPet(`Dog`);
user.addPet(`Cat`);

console.log(user.countPets());
console.log(user.getBookNames());