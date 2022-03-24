var User = (function () {
    function User(name, lastname, books, pets) {
        this.name = name;
        this.lastname = lastname;
        this.books = books;
        this.pets = pets;
    }
    User.prototype.getFullName = function () {
        return "".concat(this.name, " ").concat(this.lastname);
    };
    User.prototype.addPet = function (pet) {
        this.pets.push(pet);
    };
    User.prototype.countPets = function () {
        return this.pets.length;
    };
    User.prototype.addBook = function (book, author) {
        this.books.push({ book: book, author: author });
    };
    User.prototype.getBookNames = function () {
        return this.books.map(function (bk) { return bk.book; });
    };
    return User;
}());
var user = new User("Nicolas", "Yañez", [
    { book: "Don quijote de la mancha", author: "Miguel de Cervantes" },
    { book: "Harry Potter", author: "J K Rowling" },
], ["Dog", "Cat"]);
console.log(user.getFullName());
console.log(user.countPets());
console.log(user.getBookNames());

user.addBook("El señor de los anillos", "Tolkien");

user.addPet("Dog");
user.addPet("Cat");

console.log(user.countPets());
console.log(user.getBookNames());