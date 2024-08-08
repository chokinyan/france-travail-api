import axios from 'axios';
import { AppelationArray } from './Appelation.js';
import { CodeNAFArray } from './CodeNAF.js';
import { CodeROMEArray } from './CodeROME.js';
import { CommunesArray } from './Communes.js';
import { DepartementsArray } from './Departements.js';
import { DomainesArray } from './Domaines.js';
import { NatureContratArray } from './NatureContrat.js';
import { NiveauFormationArray } from './NiveauFormation.js';
import { PaysArray } from './Pays.js';
import { ContinentsArray } from './Continents.js';
import { PermisArray } from './Permis.js';
import { RegionsArray } from './Regions.js';
import { TypeContratArray } from './TypeContrat.js';
import { ThemeArray } from './Theme.js';
import { DivisionNAFArray } from './DivisionNAF.js';
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
const getCode = (Array, value) => { return Array.CodeArray.at(Array.LibelleArray.indexOf(value)); };
export class FranceTravail {
    constructor(clientId, SecretId) {
        this.clientId = clientId;
        this.SecretId = SecretId;
        this.Referentiel = new Referentiel(this.GetToken, this.clientId, this.SecretId);
    }
    ;
    async GetToken(Api, realm) {
        const body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.SecretId}&scope=${Api}`;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        let response = await axios.post(`https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2F${realm}`, body, { headers: headers })
            .catch(err => {
            if (err?.response.status === 400) {
                switch (err.response.data.error) {
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
            else {
                console.error(err);
            }
        });
        if (response?.status === 200) {
            return response.data["access_token"];
        }
        else {
            return "Error";
        }
    }
    async OffresDemplois(Parametre) {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        let QueryParametre = "";
        const headers = {
            Authorization: `Bearer ${this.token}`,
        };
        if (Parametre?.accesTravailleurHandicape) {
            QueryParametre += `&accesTravailleurHandicape=true`;
        }
        if (Parametre?.appellation) {
            QueryParametre += `&appellation=${getCode(AppelationArrayParametre, Parametre.appellation)}`;
        }
        if (Parametre?.codeNAF) {
            if (Parametre.codeNAF.length < 2) {
                switch (Parametre.codeNAF.length) {
                    case 2:
                        QueryParametre += `&codeNAF=${getCode(CodeNAFArrayParametre, Parametre.codeNAF[0])}%2C${getCode(CodeNAFArrayParametre, Parametre.codeNAF[1])}`;
                        break;
                    case 1:
                        QueryParametre += `&codeNAF=${getCode(CodeNAFArrayParametre, Parametre.codeNAF[0])}`;
                        break;
                    default:
                        break;
                }
            }
            else {
                console.error("Code NAF over than 2 parametre it will be not use in the request");
            }
        }
        if (Parametre?.codeROME) {
            let codeROME = "";
            Parametre.codeROME.forEach(item => {
                codeROME += `${getCode(CodeROMEArrayParametre, item)}%2C`;
            });
            QueryParametre += `&codeROME=${codeROME}`;
        }
        if (Parametre?.commune) {
            let codeCommune = "";
            Parametre.commune.forEach(item => {
                codeCommune += `${getCode(CommunesArrayParametre, item)}%2C`;
            });
            QueryParametre += `&commune=${codeCommune}`;
        }
        if (Parametre?.departement) {
            let codeDepartement = "";
            Parametre.departement.forEach(item => {
                codeDepartement += `${getCode(DepartemensArrayParametre, item)}%2C`;
            });
            QueryParametre += `&departement=${codeDepartement}`;
        }
        if (Parametre?.distance && Parametre?.distance) {
            QueryParametre += `&distance=${Parametre.distance}`;
        }
        if (Parametre?.domaine) {
            QueryParametre += `&domaine=${getCode(DomainesArrayParametre, Parametre.domaine)}`;
        }
        if (Parametre?.dureeContratMax) {
            if (Parametre.dureeContratMax < 0 && Parametre.dureeContratMax > 99) {
                QueryParametre += `&dureeContratMax=${Parametre.dureeContratMax.toPrecision(2)}`;
            }
            else {
                console.error("dureeContratMax under 0 or over 99, it will be not use in the request");
            }
        }
        if (Parametre?.dureeContratMin) {
            if (Parametre.dureeContratMin < 0 && Parametre.dureeContratMin > 99) {
                QueryParametre += `&dureeContratMin=${Parametre.dureeContratMin.toPrecision(2)}`;
            }
            else {
                console.error("dureeContratMin under 0 or over 99, it will be not use in the request");
            }
        }
        if (Parametre?.dureeHebdo) {
            console.log("Celui qui trouves ca sert a quoi veuillez me dire stp prcq la vie jsp la");
            //&dureeHebdo+=10
        }
        if (Parametre?.dureeHebdoMax) {
            let dureeHebdoMax = "";
            if (Parametre.dureeHebdoMax.heure < 0 || Parametre.dureeHebdoMax.heure > 23) {
                if (Parametre.dureeHebdoMax.heure < 10) {
                    dureeHebdoMax += `0${Parametre.dureeHebdoMax.heure}`;
                }
                else {
                    dureeHebdoMax += `${Parametre.dureeHebdoMax.heure}`;
                }
            }
            if (Parametre.dureeHebdoMax.minute < 0 || Parametre.dureeHebdoMax.minute > 59) {
                if (Parametre.dureeHebdoMax.minute < 10) {
                    dureeHebdoMax += `0${Parametre.dureeHebdoMax.minute}`;
                }
                else {
                    dureeHebdoMax += `${Parametre.dureeHebdoMax.minute})`;
                }
            }
            QueryParametre += `&dureeHebdoMax=${dureeHebdoMax}`;
        }
        if (Parametre?.dureeHebdoMin) {
            let dureeHebdoMin = "";
            if (Parametre.dureeHebdoMin.heure < 0 || Parametre.dureeHebdoMin.heure > 23) {
                if (Parametre.dureeHebdoMin.heure < 10) {
                    dureeHebdoMin += `0${Parametre.dureeHebdoMin.heure}`;
                }
                else {
                    dureeHebdoMin += `${Parametre.dureeHebdoMin.heure}`;
                }
            }
            if (Parametre.dureeHebdoMin.minute < 0 || Parametre.dureeHebdoMin.minute > 59) {
                if (Parametre.dureeHebdoMin.minute < 10) {
                    dureeHebdoMin += `0${Parametre.dureeHebdoMin.minute}`;
                }
                else {
                    dureeHebdoMin += `${Parametre.dureeHebdoMin.minute})`;
                }
            }
            QueryParametre += `&dureeHebdoMin=${dureeHebdoMin}`;
        }
        if (Parametre?.entreprisesAdaptees) {
            QueryParametre += "&entreprisesAdaptees=true";
        }
        if (Parametre?.experience) {
            let experience = "";
            Parametre.experience.forEach(item => {
                switch (item) {
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
        if (Parametre?.experienceExigence) {
            switch (Parametre.experienceExigence) {
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
        if (Parametre?.inclureLimitrophes) {
            QueryParametre += "&inclureLimitrophes=true";
        }
        if (Parametre?.maxCreationDate) {
            QueryParametre += `&maxCreationDate=${Parametre.maxCreationDate.toISOString()}`;
        }
        if (Parametre?.minCreationDate) {
            QueryParametre += `&minCreationDate=${Parametre.minCreationDate.toISOString()}`;
        }
        if (Parametre?.modeSelectionPartenaires) {
            QueryParametre += `&modeSelectionPartenaires=${Parametre.modeSelectionPartenaires}`;
        }
        if (Parametre?.motsCles) {
            QueryParametre += `&motsCles=${Parametre.motsCles}`;
        }
        if (Parametre?.natureContrat) {
            let natureContrat = "";
            Parametre.natureContrat.forEach(item => {
                natureContrat += `${getCode(NatureContratArrayParametre, item)}%2C`;
            });
            QueryParametre += `&natureContrat=${natureContrat}`;
        }
        if (Parametre?.niveauFormation) {
            QueryParametre += `&niveauFormation=${getCode(NiveauFormationArrayParametre, Parametre.niveauFormation)}`;
        }
        if (Parametre?.offresMRS) {
            QueryParametre += "&offresMRS=true";
        }
        if (Parametre?.offresManqueCandidats) {
            QueryParametre += "&offresManqueCandidats=true";
        }
        if (Parametre?.origineOffre) {
            switch (Parametre.origineOffre) {
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
        if (Parametre?.partenaire) {
            QueryParametre += `$partenaires=${Parametre.partenaire}`;
        }
        if (Parametre?.paysContinent) {
            if (Parametre.paysContinent in PaysArrayParametre.LibelleArray) {
                QueryParametre = `$paysContinent=${getCode(PaysArrayParametre, Parametre.paysContinent)}`;
            }
            else if (Parametre.paysContinent in ContinentsArrayParametre.LibelleArray) {
                QueryParametre = `$paysContinent=${getCode(ContinentsArrayParametre, Parametre.paysContinent)}`;
            }
        }
        if (Parametre?.periodeSalaire) {
            if (Parametre?.salaireMin) {
                QueryParametre += `&periodeSalaire=${Parametre.periodeSalaire.charAt(0).toUpperCase()}`;
            }
        }
        if (Parametre?.permis) {
            QueryParametre += `&permis=${getCode(PermisArrayParametre, Parametre.permis)}`;
        }
        if (Parametre?.publieeDepuis) {
            QueryParametre += `&publieeDepuis=${Parametre.publieeDepuis}`;
        }
        if (Parametre?.qualification) {
            let qualification = "";
            Parametre.qualification.forEach(item => {
                switch (item) {
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
            });
        }
        if (Parametre?.range) {
            if (!(Parametre.range.start < 0 || Parametre.range.start > 3000) || !(Parametre.range.end < 0 || Parametre.range.end > 3149)) {
                QueryParametre += `&range=${Parametre.range.start}-${Parametre.range.end}`;
            }
            else {
                console.error("Wrong range format, it will be not use in the request");
            }
        }
        if (Parametre?.region) {
            QueryParametre += `&region=${getCode(RegionsArrayParametre, Parametre.region)}`;
        }
        if (Parametre?.salaireMin) {
            if (Parametre?.periodeSalaire) {
                QueryParametre += `&salaireMin=${Parametre.salaireMin}`;
            }
        }
        if (Parametre?.secteurActivite) {
            if (Parametre.secteurActivite.length < 2) {
                switch (Parametre.secteurActivite.length) {
                    case 2:
                        QueryParametre += `&secteurActivite=${getCode(DivisionNAFArrayParametre, Parametre.secteurActivite[0])}%2C${getCode(DivisionNAFArrayParametre, Parametre.secteurActivite[1])}`;
                        break;
                    case 1:
                        QueryParametre += `&secteurActivite=${getCode(DivisionNAFArrayParametre, Parametre.secteurActivite[0])}`;
                        break;
                    default:
                        break;
                }
            }
            else {
                console.error("Division NAF over than 2 parametre it will be not use in the request");
            }
        }
        if (Parametre?.sort) {
            switch (Parametre.sort) {
                case "Pertinence décroissante , distance croissante, date de création horodatée décroissante":
                    QueryParametre += "&sort=0";
                    break;
                case "Date de création horodatée décroissante, pertinence décroissante, distance croissante":
                    QueryParametre += "&sort=1";
                    break;
                case "Distance croissante, pertinence décroissante, date de création horodatée décroissante":
                    QueryParametre += "&sort=2";
                    break;
            }
        }
        if (Parametre?.tempsPlein) {
            QueryParametre += "&tempsPlein=true";
        }
        if (Parametre?.theme) {
            QueryParametre += `&theme=${getCode(ThemeArrayParametre, Parametre.theme)}`;
        }
        if (Parametre?.typeContrat) {
            let typeContrat = "";
            Parametre.typeContrat.forEach(item => {
                typeContrat += `${getCode(TypeContratArrayParametre, item)}%2C`;
            });
            QueryParametre += `&typeContrat=${typeContrat}`;
        }
        if (QueryParametre.length !== 0) {
            QueryParametre = `?${QueryParametre.substring(1, QueryParametre.length)}`;
        }
        const response = await axios.get(`https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search${QueryParametre}`, { headers: headers }).catch(err => { console.error(err); });
        return response?.data;
    }
}
class Referentiel {
    constructor(GetTokenMethode, clientId, SecretId) {
        this.GetTokenMethode = GetTokenMethode;
        this.GetToken = GetTokenMethode;
        this.clientId = clientId;
        this.SecretId = SecretId;
    }
    async AppellationsOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/appellations", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async CodeNAFOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/nafs", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async CodeROMEOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/metiers", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async CommunesOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/communes", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async DepartementsOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/departements", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async DomainesOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/domaines", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async NatureContratOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/naturesContrats", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async NiveauFormationOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/niveauxFormations", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async PaysOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/pays", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async ContinentsOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/continents", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async PermisOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/permis", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async RegionsOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/regions", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async TypeContratOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/typesContrats", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
    async ThemeOffreDemplois() {
        this.token = await this.GetToken("o2dsoffre api_offresdemploiv2", "partenaire");
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        };
        let response;
        response = await axios.get("https://api.francetravail.io/partenaire/offresdemploi/v2/referentiel/themes", { headers: headers })
            .catch(err => {
            console.error(err);
        });
        if (response?.status === 200) {
            return response.data;
        }
    }
}
