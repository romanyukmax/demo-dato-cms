import { Url } from 'url';
export class Blog {
    titoloArticolo: String
    body:String
    createdAt: Date
    id: Number
    immagineCopertina: {url: Url, height: Number, width:Number}
    mostraCopertina:boolean
}