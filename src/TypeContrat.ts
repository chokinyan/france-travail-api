export type TypeContratParametre = "Contrat à durée indéterminée" |"Contrat à durée déterminée" |"Mission intérimaire" |"Contrat travail saisonnier" |"Profession commerciale" |"Franchise" |"Profession libérale" |"Reprise d'entreprise" |"Contrat travail temporaire insertion" |"Contrat durée déterminée insertion" |"CDI Intérimaire";

export type TypeContrat = {
    code : string,
    libelle : string
}

export class TypeContratArray{
    public readonly LibelleArray : string[];
    public readonly CodeArray : string[];

    constructor(){
        this.LibelleArray = ["Contrat à durée indéterminée" ,"Contrat à durée déterminée" ,"Mission intérimaire" ,"Contrat travail saisonnier" ,"Profession commerciale" ,"Franchise" ,"Profession libérale" ,"Reprise d'entreprise" ,"Contrat travail temporaire insertion" ,"Contrat durée déterminée insertion" ,"CDI Intérimaire"];
        this.CodeArray = ["CDI" ,"CDD" ,"MIS" ,"SAI" ,"CCE" ,"FRA" ,"LIB" ,"REP" ,"TTI" ,"DDI" ,"DIN"];
    }

}