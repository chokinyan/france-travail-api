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

type DureeHebdoFormat = {
    heure : number //beetween 0-23
    minute : number //beetween 0-59
}

type RangeFormat = {
    start : number,
    end : number
}

type ExperienceParametre = "moins d'un an" | "de 1 à 3 ans" | "plus de 3 ans"; //1,2,3
type ExperienceExigenceParametre = "débutant accepté" | "expérience souhaitée" | "expérience exigée"; //D,S,E
type ModeSelectionPartenairesParametre = "Inclus" | "Exclu";
type OrigineOffreParametre = "Pôle emploi" | "Partenaire";
type PeriodeSalaireParametre = "Mensuel" | "Annuel" | "Horaire" | "Cachet"; // M,A,H,C need salaire min
type QualificationParametre = "non-cadre" | "cadre"; // 0,9
type SortParametre = "Pertinence décroissante , distance croissante, date de création horodatée décroissante" | "Date de création horodatée décroissante, pertinence décroissante, distance croissante" | "Distance croissante, pertinence décroissante, date de création horodatée décroissante";


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
const TypeContratArrayParametre = new TypeContratArray();
const ThemeArrayParametre = new ThemeArray();

type OffreDemploisParametre = 
{
    motsCles? : string,
    accesTravailleurHandicape? : boolean,
    appellation? : AppelationParametre,
    codeNAF? : CodeNAFParametre,
    codeROME? : CodeROMEParametre,
    commune? : CommunesParametre,
    departement? : DepartementsParametre,
    distance? : number, // need commune
    domaine? : DomainesParametre,
    dureeContratMax? : number, // double between 0-99
    dureeContratMin? : number, // double between 0-99
    dureeHebdo? : number,
    dureeHebdoMax? : DureeHebdoFormat,
    dureeHebdoMin? : DureeHebdoFormat,
    entreprisesAdaptees? : boolean,
    experience? : ExperienceParametre,
    experienceExigence? : ExperienceExigenceParametre,
    inclureLimitrophes? : boolean,
    maxCreationDate? : Date,
    minCreationDate? : Date,
    modeSelectionPartenaires? : ModeSelectionPartenairesParametre,
    natureContrat? : NatureContratParametre,
    niveauFormation? : NiveauFormationParametre;
    offresMRS? : boolean,
    offresManqueCandidats? : boolean,
    origineOffre? : [OrigineOffreParametre], //1 -> Pôle emploi / 2 -> Partenaire
    partenaire? : string,
    paysContinent? : [PaysParametre | ContinentsParametre],
    periodeSalaire? : PeriodeSalaireParametre,
    permis? : [PermisParametre],
    publieeDepuis? : number,
    qualification? : QualificationParametre,
    range? : RangeFormat, 
    region? : [RegionsParametre],
    salaireMin? : number, //Salaire minimum recherché. Si cette donnée est renseignée, le code du type de salaire minimum est obligatoire.
    secteurActivite? : CodeNAFParametre, //  (2 premiers chiffres)
    sort? : SortParametre,
    tempsPlein? : boolean,
    theme? : ThemeParametre,
    typeContrat? : TypeContratParametre
};

class FranceTravail{
    private clientId : string;
    private SecretId : string;
    private token : string;
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

        const headers = {
            Authorization: `Bearer ${this.token}`,
        }
        const queryParametre = `accesTravailleurHandicape=true`
        const response = await axios.get(`https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search`,{headers : headers}).catch(err=>{console.error(err)});
        return response?.data;
    }
}

class Referentiel{
    private GetToken : Function;
    protected clientId : string;
    protected SecretId : string;
    protected token : string;

    constructor(GetTokenMethode : Function,clientId : string,SecretId : string){
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