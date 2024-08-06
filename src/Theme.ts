export type ThemeParametre = "Métiers de l'environnement et du développement durable" |"Métiers de la défense et de la sécurité publique (hors logistique, santé, tertiaire, restauration)" |"Métiers du patrimoine et de la restauration d'oeuvres d'art" |"Métiers de l'intelligence économique" |"Métiers de la recherche" |"Métiers de la mer, du nautisme et de la construction navale" |"Métiers de l'aéronautique" |"Métiers de la sécurité publique et privée" |"Métiers du multimédia" |"Métiers de l'humanitaire (hors santé et tertiaire)" |"Métiers du nucléaire" |"Métiers auprès des enfants" |"Métiers saisonniers, de vacances / Jobs d'été" |"Métiers des services à la personne à domicile" |"Métiers du sport et autour du sport" |"Métiers de l'ingénierie" |"Métiers accessibles sans diplôme et sans expérience";

export type Theme = {
    code : string,
    libelle : string
}

export class ThemeArray{
    public readonly LibelleArray : string[];
    public readonly CodeArray : string[];

    constructor(){
        this.LibelleArray = ["Métiers de l'environnement et du développement durable" ,"Métiers de la défense et de la sécurité publique (hors logistique, santé, tertiaire, restauration)" ,"Métiers du patrimoine et de la restauration d'oeuvres d'art" ,"Métiers de l'intelligence économique" ,"Métiers de la recherche" ,"Métiers de la mer, du nautisme et de la construction navale" ,"Métiers de l'aéronautique" ,"Métiers de la sécurité publique et privée" ,"Métiers du multimédia" ,"Métiers de l'humanitaire (hors santé et tertiaire)" ,"Métiers du nucléaire" ,"Métiers auprès des enfants" ,"Métiers saisonniers, de vacances / Jobs d'été" ,"Métiers des services à la personne à domicile" ,"Métiers du sport et autour du sport" ,"Métiers de l'ingénierie" ,"Métiers accessibles sans diplôme et sans expérience"];
        this.CodeArray = ["01" ,"02" ,"03" ,"04" ,"05" ,"06" ,"07" ,"08" ,"09" ,"10" ,"11" ,"12" ,"13" ,"14" ,"15" ,"16" ,"17"];
    }
}