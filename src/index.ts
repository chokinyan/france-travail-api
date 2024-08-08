import axios, {AxiosResponse} from 'axios';
import {Appelation,AppelationArray,AppelationParametre} from './Appelation.js';
import {CodeNAF,CodeNAFArray,CodeNAFParametre} from './CodeNAF.js';
import {CodeROME,CodeROMEArray,CodeROMEParametre} from './CodeROME.js';
import {Communes,CommunesArray,CommunesParametre} from './Communes.js';
import {Departements,DepartementsArray,DepartementsParametre} from './Departements.js';
import {Domaines,DomainesArray,DomainesParametre} from './Domaines.js';
import {NatureContrat,NatureContratArray,NatureContratParametre} from './NatureContrat.js';
import {NiveauFormation,NiveauFormationArray,NiveauFormationParametre} from './NiveauFormation.js';
import {Pays,PaysArray,PaysParametre} from './Pays.js';
import {Continents,ContinentsArray,ContinentsParametre} from './Continents.js';
import {Permis,PermisArray,PermisParametre} from './Permis.js';
import {Regions,RegionsArray,RegionsParametre} from './Regions.js';
import {TypeContrat,TypeContratArray,TypeContratParametre} from './TypeContrat.js';
import {Theme,ThemeArray,ThemeParametre} from './Theme.js';
import {DivisionNAFArray,DivisionNAFParametre} from './DivisionNAF.js';

export type DureeHebdoFormat = {
    heure : number //beetween 0-23
    minute : number //beetween 0-59
}

export type RangeFormat = {
    start : number,
    end : number
}

export type ExperienceParametre = "moins d'un an" | "de 1 à 3 ans" | "plus de 3 ans"; //1,2,3
export type ExperienceExigenceParametre = "débutant accepté" | "expérience souhaitée" | "expérience exigée"; //D,S,E
export type ModeSelectionPartenairesParametre = "INCLUS" | "EXCLU";
export type OrigineOffreParametre = "booth" | "Pôle emploi" | "Partenaire";
export type PeriodeSalaireParametre = "Mensuel" | "Annuel" | "Horaire" | "Cachet"; // M,A,H,C need salaire min
export type QualificationParametre = "booth" | "non-cadre" | "cadre"; // 0,9
export type SortParametre = "Pertinence décroissante , distance croissante, date de création horodatée décroissante" | "Date de création horodatée décroissante, pertinence décroissante, distance croissante" | "Distance croissante, pertinence décroissante, date de création horodatée décroissante";

const AppelationArrayParametre = new AppelationArray();
const CodeNAFArrayParametre = new CodeNAFArray();
const CodeROMEArrayParametre = new CodeROMEArray();
const CommunesArrayParametre = new CommunesArray();
const DepartemensArrayParametre = new DepartementsArray();
const DomainesArrayParametre = new DomainesArray();
const NatureContratArrayParametre = new NatureContratArray();
const NiveauFormationArrayParametre = new NiveauFormationArray();
const PaysArrayParametre = new PaysArray();
const ContinentsArrayParametre = new ContinentsArray();
const PermisArrayParametre = new PermisArray();
const RegionsArrayParametre = new RegionsArray();
const DivisionNAFArrayParametre = new DivisionNAFArray();
const TypeContratArrayParametre = new TypeContratArray();
const ThemeArrayParametre = new ThemeArray();

export type ReferentielArrayParametre = AppelationArray | CodeNAFArray | CodeROMEArray | CommunesArray | DepartementsArray | DomainesArray | NatureContratArray | NiveauFormationArray | PaysArray | ContinentsArray | RegionsArray | TypeContratArray | ThemeArray | DivisionNAFArray;

export type OffreDemploisParametre = 
{
    motsCles? : string,
    accesTravailleurHandicape? : boolean,
    appellation? : AppelationParametre,
    codeNAF? : Array<CodeNAFParametre>,
    codeROME? : Array<CodeROMEParametre>,
    commune? : Array<CommunesParametre>,
    departement? : Array<DepartementsParametre>,
    distance? : number, // need commune
    domaine? : DomainesParametre,
    dureeContratMax? : number, // double between 0-99
    dureeContratMin? : number, // double between 0-99
    dureeHebdo? : number,
    dureeHebdoMax? : DureeHebdoFormat,
    dureeHebdoMin? : DureeHebdoFormat,
    entreprisesAdaptees? : boolean,
    experience? : Array<ExperienceParametre>,
    experienceExigence? : ExperienceExigenceParametre,
    inclureLimitrophes? : boolean,
    maxCreationDate? : Date,
    minCreationDate? : Date,
    modeSelectionPartenaires? : ModeSelectionPartenairesParametre,
    natureContrat? : Array<NatureContratParametre>,
    niveauFormation? : NiveauFormationParametre,
    offresMRS? : boolean,
    offresManqueCandidats? : boolean,
    origineOffre? : OrigineOffreParametre,
    partenaire? : string,
    paysContinent? : PaysParametre | ContinentsParametre,
    periodeSalaire? : PeriodeSalaireParametre,
    permis? : Array<PermisParametre>,
    publieeDepuis? : number,
    qualification? : Array<QualificationParametre>,
    range? : RangeFormat, 
    region? : Array<RegionsParametre>,
    salaireMin? : number, //Salaire minimum recherché. Si cette donnée est renseignée, le code du type de salaire minimum est obligatoire.
    secteurActivite? : Array<DivisionNAFParametre>, //  (2 premiers chiffres) 2 max
    sort? : SortParametre,
    tempsPlein? : boolean,
    theme? : Array<ThemeParametre>,
    typeContrat? : Array<TypeContratParametre>
};

const getCode : Function = (Array : ReferentielArrayParametre,value : string)=>{return Array.CodeArray.at(Array.LibelleArray.indexOf(value))};

export class FranceTravail{
    protected clientId : string;
    protected SecretId : string;
    protected token : string;
    public readonly Referentiel : Referentiel;

    constructor(clientId : string,SecretId : string)
    {
        this.clientId = clientId;
        this.SecretId = SecretId;
        this.Referentiel = new Referentiel(this.GetToken,this.clientId,this.SecretId);
    };

    private async GetToken(Api : string,realm : string) : Promise<string>
    {
        const body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.SecretId}&scope=${Api}`;
        const headers = {
            "Content-Type" : "application/x-www-form-urlencoded"
        };
        let response : AxiosResponse<any, any> | void = await axios.post(`https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2F${realm}`,body,{headers:headers})
        .catch(err=>{
            if(err?.response.status === 400){
                switch(err.response.data.error){
                    case "invalid_client":
                        console.error(err.response.data.error_description);
                        break;
                    case "invalid_scope":
                        console.error(err.response.data.error_description);
                        break;
                    case "unsupported_grant_type":
                        console.error(err.response.data.error_description);
                        break;
                    default:
                        console.error(err);
                        break;
                }
            }
            else{
                console.error(err);
            }
        });
        if(response?.status === 200){
            return response.data["access_token"];
        }
        else{
            return "Error"
        }
    }

    async OffresDemplois(Parametre? : OffreDemploisParametre)
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        let QueryParametre : string = "";

        const headers = {
            Authorization: `Bearer ${this.token}`,
        }


        if(Parametre?.accesTravailleurHandicape){
            QueryParametre += `&accesTravailleurHandicape=true`;
        }
        if(Parametre?.appellation){
            QueryParametre += `&appellation=${getCode(AppelationArrayParametre,Parametre.appellation)}`;
        }
        if(Parametre?.codeNAF){
            if(Parametre.codeNAF.length < 2){
                switch(Parametre.codeNAF.length){
                    case 2 :
                        QueryParametre += `&codeNAF=${getCode(CodeNAFArrayParametre,Parametre.codeNAF[0])}%2C${getCode(CodeNAFArrayParametre,Parametre.codeNAF[1])}`;
                        break;
                    case 1:
                        QueryParametre += `&codeNAF=${getCode(CodeNAFArrayParametre,Parametre.codeNAF[0])}`;
                        break;
                    default:
                        break;
                }
            }else{
                console.error("Code NAF over than 2 parametre it will be not use in the request");
            }
        }
        if(Parametre?.codeROME){
            let codeROME : string = "";
            Parametre.codeROME.forEach(item=>{
                codeROME += `${getCode(CodeROMEArrayParametre,item)}%2C`;
            });
            QueryParametre += `&codeROME=${codeROME}`;
        }
        if(Parametre?.commune){
            let codeCommune : string = "";
            Parametre.commune.forEach(item=>{
                codeCommune += `${getCode(CommunesArrayParametre,item)}%2C`;
            });
            QueryParametre += `&commune=${codeCommune}`;
        }
        if(Parametre?.departement){
            let codeDepartement : string = "";
            Parametre.departement.forEach(item=>{
                codeDepartement += `${getCode(DepartemensArrayParametre,item)}%2C`;
            });
            QueryParametre += `&departement=${codeDepartement}`;
        }
        if(Parametre?.distance && Parametre?.commune){
            QueryParametre += `&distance=${Parametre.distance}`;
        }
        if(Parametre?.domaine){
            QueryParametre += `&domaine=${getCode(DomainesArrayParametre,Parametre.domaine)}`;
        }
        if(Parametre?.dureeContratMax){
            if(Parametre.dureeContratMax < 0 && Parametre.dureeContratMax > 99){
                QueryParametre += `&dureeContratMax=${Parametre.dureeContratMax.toPrecision(2)}`;
            }
            else{
                console.error("dureeContratMax under 0 or over 99, it will be not use in the request");
            }
        }
        if(Parametre?.dureeContratMin){
            if(Parametre.dureeContratMin < 0 && Parametre.dureeContratMin > 99){

                QueryParametre += `&dureeContratMin=${Parametre.dureeContratMin.toPrecision(2)}`;
            }else{
                console.error("dureeContratMin under 0 or over 99, it will be not use in the request");
            }
        }
        if(Parametre?.dureeHebdo){
            console.log("Celui qui trouves ca sert a quoi veuillez me dire stp prcq la vie jsp la");
            //&dureeHebdo+=10
        }
        if(Parametre?.dureeHebdoMax){
            let dureeHebdoMax : string = "";
            if(Parametre.dureeHebdoMax.heure < 0 || Parametre.dureeHebdoMax.heure > 23 ){
                if(Parametre.dureeHebdoMax.heure < 10){
                    dureeHebdoMax += `0${Parametre.dureeHebdoMax.heure}`;
                }else{
                    dureeHebdoMax += `${Parametre.dureeHebdoMax.heure}`;
                }
            }
            if(Parametre.dureeHebdoMax.minute < 0 || Parametre.dureeHebdoMax.minute > 59){
                if(Parametre.dureeHebdoMax.minute < 10){
                    dureeHebdoMax += `0${Parametre.dureeHebdoMax.minute}`;
                } else{
                    dureeHebdoMax += `${Parametre.dureeHebdoMax.minute})`;
                }
            }
            QueryParametre += `&dureeHebdoMax=${dureeHebdoMax}`;
        }
        if(Parametre?.dureeHebdoMin){
            let dureeHebdoMin : string = "";
            if(Parametre.dureeHebdoMin.heure < 0 || Parametre.dureeHebdoMin.heure > 23 ){
                if(Parametre.dureeHebdoMin.heure < 10){
                    dureeHebdoMin += `0${Parametre.dureeHebdoMin.heure}`;
                }else{
                    dureeHebdoMin += `${Parametre.dureeHebdoMin.heure}`;
                }
            }
            if(Parametre.dureeHebdoMin.minute < 0 || Parametre.dureeHebdoMin.minute > 59){
                if(Parametre.dureeHebdoMin.minute < 10){
                    dureeHebdoMin += `0${Parametre.dureeHebdoMin.minute}`;
                } else{
                    dureeHebdoMin += `${Parametre.dureeHebdoMin.minute})`;
                }
            }
            QueryParametre += `&dureeHebdoMin=${dureeHebdoMin}`;
        }
        if(Parametre?.entreprisesAdaptees){
            QueryParametre += "&entreprisesAdaptees=true";
        }
        if(Parametre?.experience){
            let experience : string = "";
            Parametre.experience.forEach(item=>{
                switch(item){
                    case "moins d'un an":
                        experience += "1%2C";
                        break;
                    case "de 1 à 3 ans":
                        experience += "2%2C";
                        break;
                    case "plus de 3 ans":
                        experience += "3%2C";
                        break;
                }
            });
            QueryParametre += `&experience=${experience}`;

        }
        if(Parametre?.experienceExigence){
            switch(Parametre.experienceExigence){
                case "débutant accepté":
                    QueryParametre += "&experienceExigence=D";
                    break;
                case "expérience souhaitée":
                    QueryParametre += "&experienceExigence=S";
                    break;
                case "expérience exigée":
                    QueryParametre += "&experienceExigence=E";
                    break;
            }
        }
        if(Parametre?.inclureLimitrophes){
            QueryParametre += "&inclureLimitrophes=true";
        }
        if(Parametre?.maxCreationDate){
            QueryParametre += `&maxCreationDate=${Parametre.maxCreationDate.toISOString()}`;
        }
        if(Parametre?.minCreationDate){
            QueryParametre += `&minCreationDate=${Parametre.minCreationDate.toISOString()}`;
        }
        if(Parametre?.modeSelectionPartenaires){
            QueryParametre += `&modeSelectionPartenaires=${Parametre.modeSelectionPartenaires}`;
        }
        if(Parametre?.motsCles){
            QueryParametre += `&motsCles=${Parametre.motsCles}`;
        }
        if(Parametre?.natureContrat){
            let natureContrat : string = "";
            Parametre.natureContrat.forEach(item=>{
                natureContrat += `${getCode(NatureContratArrayParametre,item)}%2C`;
            });
            QueryParametre += `&natureContrat=${natureContrat}`;
        }
        if(Parametre?.niveauFormation){
            QueryParametre += `&niveauFormation=${getCode(NiveauFormationArrayParametre,Parametre.niveauFormation)}`;
        }
        if(Parametre?.offresMRS){
            QueryParametre += "&offresMRS=true";
        }
        if(Parametre?.offresManqueCandidats){
            QueryParametre += "&offresManqueCandidats=true";
        }
        if(Parametre?.origineOffre){
            switch(Parametre.origineOffre){
                //origineOffre
                case "booth":
                    QueryParametre += "&origineOffre=0";
                    break;
                case "Pôle emploi":
                    QueryParametre += "&origineOffre=1";    
                    break;
                case "Partenaire":
                    QueryParametre += "&origineOffre=2";
                    break;
            }
        }
        if(Parametre?.partenaire){
            QueryParametre += `$partenaires=${Parametre.partenaire}`;
        }
        if(Parametre?.paysContinent){
            if(Parametre.paysContinent in PaysArrayParametre.LibelleArray){
                QueryParametre = `$paysContinent=${getCode(PaysArrayParametre,Parametre.paysContinent)}`;
            }else if(Parametre.paysContinent in ContinentsArrayParametre.LibelleArray){
                QueryParametre = `$paysContinent=${getCode(ContinentsArrayParametre,Parametre.paysContinent)}`;
            }
        }
        if(Parametre?.periodeSalaire && Parametre?.salaireMin){
            QueryParametre += `&periodeSalaire=${Parametre.periodeSalaire.charAt(0).toUpperCase()}`;
        }
        if(Parametre?.permis){
            QueryParametre += `&permis=${getCode(PermisArrayParametre,Parametre.permis)}`
        }
        if(Parametre?.publieeDepuis){
            QueryParametre += `&publieeDepuis=${Parametre.publieeDepuis}`;
        }
        if(Parametre?.qualification){
            let qualification : string = "";
            Parametre.qualification.forEach(item=>{
                switch(item){
                    case "booth":
                        qualification += "X%2C";
                        break;
                    case "cadre":
                        qualification += "9%2C";
                        break;
                    case "non-cadre":
                        qualification += "0%2C";
                        break;
                }
            })

        }
        if(Parametre?.range){
            if(!(Parametre.range.start < 0 || Parametre.range.start > 3000) || !(Parametre.range.end < 0 || Parametre.range.end > 3149)){
                QueryParametre += `&range=${Parametre.range.start}-${Parametre.range.end}`;
            }else{
                console.error("Wrong range format, it will be not use in the request");
            }
        }
        if(Parametre?.region){
            QueryParametre += `&region=${getCode(RegionsArrayParametre,Parametre.region)}`;
        }
        if(Parametre?.salaireMin){
            if(Parametre?.periodeSalaire){
                QueryParametre += `&salaireMin=${Parametre.salaireMin}`;
            }
        }
        if(Parametre?.secteurActivite){
            if(Parametre.secteurActivite.length < 2){
                switch(Parametre.secteurActivite.length){
                    case 2 :
                        QueryParametre += `&secteurActivite=${getCode(DivisionNAFArrayParametre,Parametre.secteurActivite[0])}%2C${getCode(DivisionNAFArrayParametre,Parametre.secteurActivite[1])}`;
                        break;
                    case 1:
                        QueryParametre += `&secteurActivite=${getCode(DivisionNAFArrayParametre,Parametre.secteurActivite[0])}`;
                        break;
                    default:
                        break;
                }
            }else{
                console.error("Division NAF over than 2 parametre it will be not use in the request");
            }
        }
        if(Parametre?.sort){
            switch(Parametre.sort){
                case "Pertinence décroissante , distance croissante, date de création horodatée décroissante" :
                    QueryParametre += "&sort=0";
                    break;
                case "Date de création horodatée décroissante, pertinence décroissante, distance croissante" :
                    QueryParametre += "&sort=1";    
                    break;
                case "Distance croissante, pertinence décroissante, date de création horodatée décroissante":
                    QueryParametre += "&sort=2";
                    break;
            }
        }
        if(Parametre?.tempsPlein){
            QueryParametre += "&tempsPlein=true";
        }
        if(Parametre?.theme){
            QueryParametre += `&theme=${getCode(ThemeArrayParametre,Parametre.theme)}`;
        }
        if(Parametre?.typeContrat){
            let typeContrat : string = "";
            Parametre.typeContrat.forEach(item=>{
                typeContrat += `${getCode(TypeContratArrayParametre,item)}%2C`;
            });
            QueryParametre += `&typeContrat=${typeContrat}`;
        }

        if(QueryParametre.length !== 0){
            QueryParametre = `?${QueryParametre.substring(1, QueryParametre.length)}`;
        }

        const response = await axios.get(`https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search${QueryParametre}`,{headers : headers}).catch(err=>{console.error(err)});
        return response?.data;
    }
}

class Referentiel{
    protected GetToken : Function;
    protected clientId : string;
    protected SecretId : string;
    protected token : string;

    constructor(protected GetTokenMethode : Function,clientId : string,SecretId : string){
        this.GetToken = GetTokenMethode;
        this.clientId = clientId;
        this.SecretId = SecretId;
    }

    async AppellationsOffreDemplois() : Promise<[Appelation] | void>
        {
            this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

            const headers = 
            {
                Authorization : `Bearer ${this.token}`,
                Accept: 'application/json'
            };

            let response : AxiosResponse<any,any> | void
            response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/appellations",{headers : headers})
            .catch(err=>
            {
                console.error(err);
            });
    
            if(response?.status === 200)
                {
                return response.data;
            }
    }

    async CodeNAFOffreDemplois() : Promise<[CodeNAF] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/nafs",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async CodeROMEOffreDemplois() : Promise<[CodeROME] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/metiers",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async CommunesOffreDemplois() : Promise<[Communes] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/communes",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async DepartementsOffreDemplois() : Promise<[Departements] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/departements",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async DomainesOffreDemplois() : Promise<[Domaines] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/domaines",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async NatureContratOffreDemplois() : Promise<[NatureContrat] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/naturesContrats",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async NiveauFormationOffreDemplois() : Promise<[NiveauFormation] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/niveauxFormations",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async PaysOffreDemplois() : Promise<[Pays] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/pays",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }
    async ContinentsOffreDemplois() : Promise<[Continents] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/continents",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async PermisOffreDemplois() : Promise<[Permis] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/permis",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async RegionsOffreDemplois() : Promise<[Regions] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/regions",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async TypeContratOffreDemplois() : Promise<[TypeContrat] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/typesContrats",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }

    async ThemeOffreDemplois() : Promise<[Theme] | void>
    {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2","partenaire");

        const headers = 
        {
            Authorization : `Bearer ${this.token}`,
            Accept: 'application/json'
        };

        let response : AxiosResponse<any,any> | void
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/themes",{headers : headers})
        .catch(err=>
        {
            console.error(err);
        });

        if(response?.status === 200)
            {
            return response.data;
        }
    }
}