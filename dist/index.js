import axios from 'axios';
class FranceTravail {
    constructor(clientId, SecretId) {
        this.clientId = clientId;
        this.SecretId = SecretId;
        this.Referentiel = new Referentiel(clientId, SecretId);
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
            this.token = response.data["access_token"];
        }
    }
    async OffresDemplois() {
        await this.GetToken("o2dsoffre", "partenaire");
    }
}
class Referentiel extends FranceTravail {
    async AppellationsOffreDemplois() {
        super.GetToken("o2dsoffre", "partenaire");
        const headers = {
            Authorization: "Bearer " + this.token
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
}
