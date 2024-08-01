import axios, {AxiosError, AxiosResponse} from 'axios';
import {load} from 'cheerio';

//https://candidat.francetravail.fr/offres/recherche?lieux=68224&motsCles=informatique&offresPartenaires=true&range=0-19&rayon=10&tri=0

//type sortByParamatre = "Relevant" | "Date" | "Distance";
//type distanceParamatre = "exact location" | "5 km" | "10 km" | "20 km" | "30 km" | "40 km" | "50 km" | "60 km" | "70 km" | "80 km" | "90 km" | "100 km";
//type CreationDateParametre = "a day" | "three days" | "a week" | "two weeks" | "a month" | "all"
//type ContratParametre = "CDI" | "CDD" | "interim" | "CDI Interimaire" | "Saisonnier" | "Contrat apprentissage" | "Contrat professionnalisation" | "Act. Formation pre.recrut." | "Prépa.operationnel.emploi" | "CDI de chantier ou d'operation" | "Contrat d'engagement educatif" | "Contrat intermittent" | "Contrat pact"| "Contrat d'usage" | "CUI CAE" | "CUI CIE" | "Engagement a servir dans la reserve" | "Franchise" | "Insertion par l'activ.eco." | "Portage salarial" | "Profession commerciale" | "Profession liberale" | "Resprise d'entreprise";
//type DurationParametre = "Temps plein" | "Temps partiel" | "Non renseignée";
//type DomaineParametre = "Achat / Comptabilite / Gestion" | "Arts / Artisanat d'art" | "Banque / Assurance" | "Batiment / Travaux Publics" | "Commerce / Vente" | "Communication / Multimedia" | "Conseil / Etudes" | "Direction d'entreprise" | "Espaces verts et naturels / Agriculture / Peche / Soins aux animaux" | "Hotellerie - Restauration / Tourisme / Animation" | "Immobilier" | "Industrie" | "Informatique / Telecommunication" | "Installation / Maintenance" | "Marketing / Strategie commerciale" | "Ressources Humaines" | "Sante" | "Secretariat / Assistanat" | "Services à la personne / à la collectivite" | "Spectacle" | "Sport" | "Transport / Logistique";
//type ExperienceParametre = "Moins de 1 an" | "De 1 a 3 ans" | "Plus de 3 ans" | "Non renseignee";
//type QualitficationParametre = "Cadre" | "Non cadre" | "Non renseignee";
//type SalaireBrutParametre = {salaire : Number,time : "Mensuel" |"Annuel"|"Horaire"|"Cachet"};
//type HandicapeParametre = "Entreprise handi-bienveillante" | "Entreprise adaptée";
//
//type FranceTravailInfo = {
//    keywords : string | "", // #motsCles
//    sortBy? : sortByParamatre, // Relevant : 1 | Date : 2 | Distance : 3 #tri
//    addressCode? : number, // code postal #lieux
//    partenaireShip : boolean, // #offresPartenaires
//    distance : distanceParamatre, // exact location : 0 #rayon
//    deparetement? : boolean, // #lieu + D
//    creationDate : CreationDateParametre, // all : pas de parametre | a day : 1 | three days : 3 | a week : 7 | two weeks : 14 | a month : 31 #emission
//    contrat? : [ContratParametre], // #typeContrat CDI : CDI | CDD : CDD | interim : MIS | CDI Interimaire : DIN | Saisonnier : SAI | #natureOffre Contrat apprentissage : E2 | #natureOffre Contrat professionnalisation : FS | #natureOffre Act. Formation pre.recrut. : FA | #natureOffre Prépa.operationnel.emploi : FV | #natureOffre CDI de chantier ou d'operation : CC | #natureOffre Contrat d'engagement educatif : EE | #natureOffre Contrat intermittent : CI | #natureOffre Contrat pact : FJ | #natureOffre Contrat d'usage : CU | #natureOffre CUI CAE : FT | #natureOffre CUI CIE : FU | #natureOffre Engagement a servir dans la reserve : ER | Franchise : FRA | #nautreOffre Insertion par l'activ.eco. : I1 | #nautreOffre Portage salarial : PS | Profession commerciale : CCE | Profession liberale : LIB | Resprise d'entreprise : REP
//    duration? : [DurationParametre], // #dureeHebdo Temps plein : 1 | Temps partiel : 2 | Non renseignée : 0
//    domaine? : [DomaineParametre], // #domaine "Achat / Comptabilite / Gestion" : M | "Arts / Artisanat d'art" : B | "Banque / Assurance" : C | "Batiment / Travaux Publics" : F | "Commerce / Vente" : D | "Communication / Multimedia" : E | "Conseil / Etudes" : M14 | "Direction d'entreprise" : M13 | "Espaces verts et naturels / Agriculture / Peche / Soins aux animaux" : A | "Hotellerie - Restauration / Tourisme / Animation" : G | "Immobilier" : C15 | "Industrie" : H | "Informatique / Telecommunication" : M18 | "Installation / Maintenance" : I | "Marketing / Strategie commerciale" : M17 | "Ressources Humaines" : M15 | "Sante" : J | "Secretariat / Assistanat" : M16 | "Services à la personne / à la collectivite" : K | "Spectacle" : L | "Sport" : L14 | "Transport / Logistique" : N
//    experience? : [ExperienceParametre], // #experienceSouhaitee "Moins de 1 an" : 1 | "De 1 a 3 ans" : 2 | "Plus de 3 ans" : 3 | "Non renseignee" : 0
//    qualification? : [QualitficationParametre], // #qualification "Cadre" : 9 | "Non cadre" : 0 | "Non renseignee" : X
//    opportunity? : boolean, // #offresPeuDeCandidats (bool)
//    salaire? : SalaireBrutParametre, // #salaireMin (Number) || #uniteSalaire Mensuel : M | Annuel : A | Horaire : H | Cachet : C
//    handicape? : [HandicapeParametre], // Entreprise handi-bienveillante : #Handibienveillantes (bool) | Entreprise adaptée : #offresEntreprisesAdaptees (bool)
//};

//https://candidat.francetravail.fr/offres/recherche?lieux=68224&motsCles=informatique&offresPartenaires=true&rayon=10&tri=0

type Appelation = 
{
    code : string,
    libelle : string
};

type AppelationParametre = "";
type CodeROMEParametre = "";


type OffreDemploisParametre = 
{
    accesTravailleurHandicape : boolean,
    appellation : AppelationParametre,
    codeNAF : string,
    codeROME : CodeROMEParametre
};

class FranceTravail{
    protected clientId : string;
    protected SecretId : string;
    protected token : string;
    public Referentiel : Referentiel;

    constructor(clientId : string,SecretId : string){
        this.clientId = clientId;
        this.SecretId = SecretId;
        this.Referentiel = new Referentiel(clientId,SecretId);
    };

    protected async GetToken(Api : string,realm : string) : Promise<void>
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
        if(response?.status === 200){this.token = response.data["access_token"]}
    }

    async OffresDemplois()
    {
        await this.GetToken("o2dsoffre","partenaire");


    }

}

class Referentiel extends FranceTravail{

    async AppellationsOffreDemplois() : Promise<[Appelation] | void>
        {
            super.GetToken("o2dsoffre","partenaire");
    
            const headers = 
            {
                Authorization : "Bearer " + this.token
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
}