export type PermisParametre = "AM - Cyclomoteur <= 50 cm3" |"A1 - Motocyclette <=125 cm3" |"A2 - Moto <= 600 cm3" |"A - Moto" |"B1 - Quadricycle" |"B - Véhicule léger" |"B mention 96 - VL + remorque (PTAC < 4,25 T)" |"EB - Véhicule léger + remorque" |"B mention 79.06 (= EB)" |"BE - Véhicule léger + remorque  (PTAC > 4,25 T)" |"C1 - Poids lourd < 7,5 T" |"C1E - Poids lourd < 7,5 T + remorque" |"C - Poids lourd" |"CE - Poids lourd + remorque  (= EC)" |"EC - Poids lourd + remorque" |"D1 - Transport de personnes <= 16 places" |"D1E - Transport de personnes <= 16 P + remorque" |"D - Transport de personnes" |"DE - Transport de personnes + remorque (= ED)" |"ED - Transport de personnes + remorque";

export type Permis = {
    code : string,
    libelle : string
};

export class PermisArray{
    public readonly LibelleArray : string[];
    public readonly CodeArray : string[];

    constructor(){
        this.LibelleArray = ["AM - Cyclomoteur <= 50 cm3" ,"A1 - Motocyclette <=125 cm3" ,"A2 - Moto <= 600 cm3" ,"A - Moto" ,"B1 - Quadricycle" ,"B - Véhicule léger" ,"B mention 96 - VL + remorque (PTAC < 4,25 T)" ,"EB - Véhicule léger + remorque" ,"B mention 79.06 (= EB)" ,"BE - Véhicule léger + remorque  (PTAC > 4,25 T)" ,"C1 - Poids lourd < 7,5 T" ,"C1E - Poids lourd < 7,5 T + remorque" ,"C - Poids lourd" ,"CE - Poids lourd + remorque  (= EC)" ,"EC - Poids lourd + remorque" ,"D1 - Transport de personnes <= 16 places" ,"D1E - Transport de personnes <= 16 P + remorque" ,"D - Transport de personnes" ,"DE - Transport de personnes + remorque (= ED)" ,"ED - Transport de personnes + remorque"];
        this.CodeArray = ["AM" ,"A1" ,"A2" ,"A" ,"B1" ,"B" ,"B96" ,"EB" ,"B79" ,"BE" ,"C1" ,"C1E" ,"C" ,"CE" ,"EC" ,"D1" ,"D1E" ,"D" ,"DE" ,"ED"];
    }

}