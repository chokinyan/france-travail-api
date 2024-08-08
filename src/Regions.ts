export type RegionsParametre = "Guadeloupe" |"Martinique" |"Guyane" |"La Réunion" |"Mayotte" |"Ile-de-France" |"Centre-Val de Loire" |"Bourgogne-Franche-Comté" |"Normandie" |"Hauts-de-France" |"Grand Est" |"Pays de la Loire" |"Bretagne" |"Nouvelle-Aquitaine" |"Occitanie" |"Auvergne-Rhône-Alpes" |"Provence-Alpes-Côte d'Azur" |"Corse";

export type Regions = {
    code : string,
    libelle : string
}

export class RegionsArray{
    public readonly LibelleArray : Array<string>;
    public readonly CodeArray : Array<string>;

    constructor(){
        this.LibelleArray = ["Guadeloupe" ,"Martinique" ,"Guyane" ,"La Réunion" ,"Mayotte" ,"Ile-de-France" ,"Centre-Val de Loire" ,"Bourgogne-Franche-Comté" ,"Normandie" ,"Hauts-de-France" ,"Grand Est" ,"Pays de la Loire" ,"Bretagne" ,"Nouvelle-Aquitaine" ,"Occitanie" ,"Auvergne-Rhône-Alpes" ,"Provence-Alpes-Côte d'Azur" ,"Corse"];
        this.CodeArray = ["01" ,"02" ,"03" ,"04" ,"06" ,"11" ,"24" ,"27" ,"28" ,"32" ,"44" ,"52" ,"53" ,"75" ,"76" ,"84" ,"93" ,"94"];
    }

}