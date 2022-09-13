class FileContainer {
    static contadorId = 1

    constructor(fileName){
        this.fileName="./public/"+fileName;
    }

    
}

module.exports = FileContainer