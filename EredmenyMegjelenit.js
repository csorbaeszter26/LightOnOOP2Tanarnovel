export default class EredmenyMegjelenit{
    #db
    #szuloElem
    constructor(db, szuloElem){
        this.#db = db;
        this.#szuloElem = szuloElem;
        this.#megjelenit();
    }
    #megjelenit(){
        let txt = `<p>${this.#db}</p>`
        this.#szuloElem.html(txt);
    }

}