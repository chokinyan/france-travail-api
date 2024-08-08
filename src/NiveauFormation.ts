export type NiveauFormationParametre = "Aucune formation scolaire" |"Primaire à 4ème" |"4ème achevée" |"3ème achevée ou Brevet" |"2nd ou 1ère achevée" |"CAP, BEP et équivalents" |"Niveau Bac" |"Bac ou équivalent" |"Bac+2 ou équivalents" |"Bac+3, Bac+4 ou équivalents" |"Bac+5 et plus ou équivalents";

export type NiveauFormation = {
    code : string,
    libelle : string
};

export class NiveauFormationArray{
    public readonly LibelleArray : Array<string>;
    public readonly CodeArray : Array<string>;

    constructor(){
        this.LibelleArray = ["Aucune formation scolaire" ,"Primaire à 4ème" ,"4ème achevée" ,"3ème achevée ou Brevet" ,"2nd ou 1ère achevée" ,"CAP, BEP et équivalents" ,"Niveau Bac" ,"Bac ou équivalent" ,"Bac+2 ou équivalents" ,"Bac+3, Bac+4 ou équivalents" ,"Bac+5 et plus ou équivalents"];
        this.CodeArray = ["AFS" ,"CP4" ,"CFG" ,"C3A" ,"C12" ,"NV5" ,"NV4b" ,"NV4" ,"NV3" ,"NV2" ,"NV1"];
    }

}