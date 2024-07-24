import axios from 'axios';
(async () => {
    const rep = await axios.get("https://candidat.francetravail.fr/offres/recherche?lieux=68224&motsCles=informatique&offresPartenaires=true&range=0-19&rayon=0&tri=0").catch((err) => { console.error(err); });
    if (rep?.status === 200) {
        console.log(rep.data);
    }
    while (true) { }
})();
