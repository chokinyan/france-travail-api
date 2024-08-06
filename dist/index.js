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
class FranceTravail {
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
        const headers = {
            Authorization: `Bearer ${this.token}`,
        };
        const queryParametre = `accesTravailleurHandicape=true`;
        const response = await axios.get(`https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search`, { headers: headers }).catch(err => { console.error(err); });
        return response?.data;
    }
}
class Referentiel {
    constructor(GetTokenMethode, clientId, SecretId) {
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
(async () => {
    const t = new FranceTravail("PAR_apitest_139ac48b4df6c573f3d49b529f98f2df4113ac10349873a6ec0949f80e0f609c", "8b7a0c8be4f7469ebb4f5e1a311072f17ae1f081df782b7ac71748f739f0f924");
    console.log(await t.Referentiel.ThemeOffreDemplois());
    while (true) { }
})();
