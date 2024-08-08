import {Regions} from './Regions.js';

export type DepartementsParametre = "Ain" |"Aisne" |"Allier" |"Alpes-de-Haute-Provence" |"Hautes-Alpes" |"Alpes-Maritimes" |"Ardèche" |"Ardennes" |"Ariège" |"Aube" |"Aude" |"Aveyron" |"Bouches-du-Rhône" |"Calvados" |"Cantal" |"Charente" |"Charente-Maritime" |"Cher" |"Corrèze" |"Côte-d'Or" |"Côtes-d'Armor" |"Creuse" |"Dordogne" |"Doubs" |"Drôme" |"Eure" |"Eure-et-Loir" |"Finistère" |"Corse-du-Sud" |"Haute-Corse" |"Gard" |"Haute-Garonne" |"Gers" |"Gironde" |"Hérault" |"Ille-et-Vilaine" |"Indre" |"Indre-et-Loire" |"Isère" |"Jura" |"Landes" |"Loir-et-Cher" |"Loire" |"Haute-Loire" |"Loire-Atlantique" |"Loiret" |"Lot" |"Lot-et-Garonne" |"Lozère" |"Maine-et-Loire" |"Manche" |"Marne" |"Haute-Marne" |"Mayenne" |"Meurthe-et-Moselle" |"Meuse" |"Morbihan" |"Moselle" |"Nièvre" |"Nord" |"Oise" |"Orne" |"Pas-de-Calais" |"Puy-de-Dôme" |"Pyrénées-Atlantiques" |"Hautes-Pyrénées" |"Pyrénées-Orientales" |"Bas-Rhin" |"Haut-Rhin" |"Rhône" |"Haute-Saône" |"Saône-et-Loire" |"Sarthe" |"Savoie" |"Haute-Savoie" |"Paris" |"Seine-Maritime" |"Seine-et-Marne" |"Yvelines" |"Deux-Sèvres" |"Somme" |"Tarn" |"Tarn-et-Garonne" |"Var" |"Vaucluse" |"Vendée" |"Vienne" |"Haute-Vienne" |"Vosges" |"Yonne" |"Territoire de Belfort" |"Essonne" |"Hauts-de-Seine" |"Seine-Saint-Denis" |"Val-de-Marne" |"Val-d'Oise" |"Guadeloupe" |"Martinique" |"Guyane" |"La Réunion" |"Mayotte";

export type Departements = {
    code : string,
    libelle : string,
    region : Regions
};

export class DepartementsArray{

    public readonly LibelleArray : Array<string>;
    public readonly CodeArray : Array<string>;

    constructor(){

        this.LibelleArray = ["Ain" ,"Aisne" ,"Allier" ,"Alpes-de-Haute-Provence" ,"Hautes-Alpes" ,"Alpes-Maritimes" ,"Ardèche" ,"Ardennes" ,"Ariège" ,"Aube" ,"Aude" ,"Aveyron" ,"Bouches-du-Rhône" ,"Calvados" ,"Cantal" ,"Charente" ,"Charente-Maritime" ,"Cher" ,"Corrèze" ,"Côte-d'Or" ,"Côtes-d'Armor" ,"Creuse" ,"Dordogne" ,"Doubs" ,"Drôme" ,"Eure" ,"Eure-et-Loir" ,"Finistère" ,"Corse-du-Sud" ,"Haute-Corse" ,"Gard" ,"Haute-Garonne" ,"Gers" ,"Gironde" ,"Hérault" ,"Ille-et-Vilaine" ,"Indre" ,"Indre-et-Loire" ,"Isère" ,"Jura" ,"Landes" ,"Loir-et-Cher" ,"Loire" ,"Haute-Loire" ,"Loire-Atlantique" ,"Loiret" ,"Lot" ,"Lot-et-Garonne" ,"Lozère" ,"Maine-et-Loire" ,"Manche" ,"Marne" ,"Haute-Marne" ,"Mayenne" ,"Meurthe-et-Moselle" ,"Meuse" ,"Morbihan" ,"Moselle" ,"Nièvre" ,"Nord" ,"Oise" ,"Orne" ,"Pas-de-Calais" ,"Puy-de-Dôme" ,"Pyrénées-Atlantiques" ,"Hautes-Pyrénées" ,"Pyrénées-Orientales" ,"Bas-Rhin" ,"Haut-Rhin" ,"Rhône" ,"Haute-Saône" ,"Saône-et-Loire" ,"Sarthe" ,"Savoie" ,"Haute-Savoie" ,"Paris" ,"Seine-Maritime" ,"Seine-et-Marne" ,"Yvelines" ,"Deux-Sèvres" ,"Somme" ,"Tarn" ,"Tarn-et-Garonne" ,"Var" ,"Vaucluse" ,"Vendée" ,"Vienne" ,"Haute-Vienne" ,"Vosges" ,"Yonne" ,"Territoire de Belfort" ,"Essonne" ,"Hauts-de-Seine" ,"Seine-Saint-Denis" ,"Val-de-Marne" ,"Val-d'Oise" ,"Guadeloupe" ,"Martinique" ,"Guyane" ,"La Réunion" ,"Mayotte"];
        this.CodeArray = ["01" ,"02" ,"03" ,"04" ,"05" ,"06" ,"07" ,"08" ,"09" ,"10" ,"11" ,"12" ,"13" ,"14" ,"15" ,"16" ,"17" ,"18" ,"19" ,"21" ,"22" ,"23" ,"24" ,"25" ,"26" ,"27" ,"28" ,"29" ,"2A" ,"2B" ,"30" ,"31" ,"32" ,"33" ,"34" ,"35" ,"36" ,"37" ,"38" ,"39" ,"40" ,"41" ,"42" ,"43" ,"44" ,"45" ,"46" ,"47" ,"48" ,"49" ,"50" ,"51" ,"52" ,"53" ,"54" ,"55" ,"56" ,"57" ,"58" ,"59" ,"60" ,"61" ,"62" ,"63" ,"64" ,"65" ,"66" ,"67" ,"68" ,"69" ,"70" ,"71" ,"72" ,"73" ,"74" ,"75" ,"76" ,"77" ,"78" ,"79" ,"80" ,"81" ,"82" ,"83" ,"84" ,"85" ,"86" ,"87" ,"88" ,"89" ,"90" ,"91" ,"92" ,"93" ,"94" ,"95" ,"971" ,"972" ,"973" ,"974" ,"976"];
    }
}