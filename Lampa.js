export default class Lampa {
    #allapot = false;
    #id = 0;
    #divElem;
    #szuloElem;

    constructor(allapot, id, szuloElem){
       // console.log(allapot, id)
        //adattagok beallitasa
        this.#id = id; // ez fogja jelenteni, hogy hanyadik lampa a sorban
        this.#allapot = allapot; //fel v levannak kapcsolva
        this.#szuloElem = szuloElem; //amelyikbe belepakoljuk majd a kis divunket es meghivjuk a megjelenit metodust
        this.#megjelenit()
        this.#divElem=this.#szuloElem.children("div:last-child") //szuloelem utolso divjet kell megfognunk
        this.#szinBeallit()
        this.#divElem.on("click", ()=> {
            this.#kattintasTrigger("kapcsolas")
            this.setAllapot();
    })
            
    }

    #megjelenit(){
        let txt = `<div></div>`;
        this.#szuloElem.append(txt);
    }

    setAllapot(){
        this.#allapot=!this.#allapot;
        this.#szinBeallit()
    }

    #szinBeallit(){
        if (this.#allapot){
            //ratesszuk a divre a .felkapcs osztalyt
            this.#divElem.addClass("felkapcs");
        }else{
            //levesszuk a divrol a felkapcs osztalyt
            this.#divElem.removeClass("felkapcs");
        }
    }

    #kattintasTrigger(esemenyNev){
        const kapcsolas = new CustomEvent(esemenyNev, {detail:this.#id})
        window.dispatchEvent(kapcsolas)
    }

}