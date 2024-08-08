export type ContinentsParametre = "France (continent fictif)" |"EUROPE (hors France)" |"Océanie" |"Afrique" |"Amérique" |"Asie" |"Monde";

export type Continents = {
    code : string,
    libelle : string
};

export class ContinentsArray{
    public readonly LibelleArray : Array<string>;
    public readonly CodeArray : Array<string>;

    constructor(){
        this.LibelleArray = ["France (continent fictif)" ,"EUROPE (hors France)" ,"Océanie" ,"Afrique" ,"Amérique" ,"Asie" ,"Monde"];
        this.CodeArray = ["00" ,"9C" ,"9F" ,"AF" ,"AM" ,"AS" ,"XX"];
    }

}