import axios, { Axios } from 'axios';
import {load} from 'cheerio';

//https://candidat.francetravail.fr/offres/recherche?lieux=68224&motsCles=informatique&offresPartenaires=true&range=0-19&rayon=10&tri=0

type sortByParamatre = "Relevant" | "Date" | "Distance";
type distanceParamatre = "exact location" | "5 km" | "10 km" | "20 km" | "30 km" | "40 km" | "50 km" | "60 km" | "70 km" | "80 km" | "90 km" | "100 km";
type CreationDateParametre = "a day" | "three days" | "a week" | "two weeks" | "a month" | "all" // emission



type FranceTravailInfo = {
    keywords : string | "",
    sortBy? : sortByParamatre, // Relevant : 1 | Date : 2 | Distance : 3
    addressCode? : number, // code postal
    partenaireShip : boolean,
    distance : distanceParamatre, // exact location : 0
    deparetement? : boolean,
    creationDate : CreationDateParametre // all : pas de parametre | a day : 1 | three days : 3 | a week : 7 | two weeks : 14 | a month : 31
};

(async ()=>{

    const rep = await axios.get("https://candidat.francetravail.fr/offres/recherche?lieux=68224&motsCles=informatique&offresPartenaires=true&range=0-19&rayon=0&tri=0").catch((err)=>{console.error(err)});

    if(rep?.status === 200){
        console.log(rep.data);
    }

    while(true){}
    
})();