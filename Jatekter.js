import EredmenyMegjelenit from "./EredmenyMegjelenit.js";
import Lampa from "./Lampa.js";

export default class Jatekter{
    #db = 0;
    #allapotLista = [] // ezzel reprezentalom a kis jatekom, fel v le van kapcsolva a kis lampa,pl [false, false, true, false..9db]
    #lepes = 0;

    constructor(){
        this.#setAllapotLista();
        this.#init();
        $(window).on("kapcsolas", (event)=>{
            console.log(event.detail);
            let id=event.detail
            this.#szomszedokKeresese(id)
            this.#lepes++;
            console.log(this.#lepes);
        })
       
    }

    #setAllapotLista(){
        for (let index = 0; index < 9; index++){
            let veletlen=Math.random() //0 1 kozott general
            if(veletlen < 0.2){
                this.#allapotLista[index] = true
            }else{
                this.#allapotLista[index] = false
            }     
        }
    }

    #szomszedokKeresese(id){
        this.#allapotLista[id]=!this.#allapotLista[id] //= ha true volt false lesz, ha false volt true lesz
        //id. elem szomszedjai: 
        //id-1, id+1, id-3, id+3 
        if (id%3!==2){
            this.#allapotLista[id+1]=!this.#allapotLista[id+1]
        }
        if (id%3!==0){
            this.#allapotLista[id-1]=!this.#allapotLista[id-1]
        }
        if (id<6){
            this.#allapotLista[id+3]=!this.#allapotLista[id+3]
        } 
        if(id>2){
            this.#allapotLista[id-3]=!this.#allapotLista[id-3]
        }
        

        //egesz jatekteret ujra inicializalom, ujra meghivom az init fuggvenyt,
        // allapotlistanak megfeleloen ujra megjelenitem az elemeket
        this.#init()

    }

    #init(){
        $(".jatekter").empty();
        this.#db = 0;
        this.#ellenorzes();
        //hanyszor kell peldanyositani?, -> az allapot lista ahosszan kell vegigmenni
        this.#allapotLista.forEach((elem, index)=>{
            new Lampa(elem, index, $(".jatekter"))
        });// ez itt peldanyositja a lampakat 9x

        new EredmenyMegjelenit(this.#db, $(".eredmeny"))

    }

    #ellenorzes(){
        //megnezi hogy hany lampa eg
        this.#allapotLista.forEach((elem, index) => {
            if (!elem){
                //lekapcsolt false allapotokat szamolja
                this.#db++;
            }
            
        })
    }

}