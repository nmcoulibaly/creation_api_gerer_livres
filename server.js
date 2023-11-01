const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 9000;

// Middleware : un logiciel qui fournit aux app des fonctionnalités 
// et des services communs que le systeme d'exploitation n'offre pas
app.use(cors());
app.use(bodyParser.json());
const livresFile = './livres.json'

// Fonction pour lire les livres depuis le fichier json
function readLivres() {
    try {
        const data = fs.readFileSync(livresFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file Livres.json:', error);
        return []
    }
}
// Fonction pour enregistrer les livres dans le fichier json
function saveLivres(data) {
    fs.writeFileSync(livresFile, JSON.stringify(data, null, 2), 'utf-8');
}

// Route pour afficher tous les livres
app.get('/livres', (req, res) => {
    const livres = readLivres();
    res.status(200).json(livres);
});

// Route pour afficher un livre par rapport à son id
app.get('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livres = readLivres();
    const leLivre = livres.find(livre => { livre.id === id });
    res.status(200).json(leLivre);
});

// Route pour afficher un livre par rapport à son nom

app.get('/livres/tittre/:titre', (req, res) => {
    const titre = req.params.titre;
    const livres = readLivres();
    const nomLivre = livres.find(livre => { livre.titre === titre });
    res.status(200).json(nomLivre);
});

// Route pour ajouter un nouveau livre 
app.post('/livres', (req, res) => {
    const livres = readLivres();
    livres.push(req.body);
    saveLivres(livres);
    res.status(200).json(livres);
});

// Route pour modifier un livre par rapport à son id

app.put('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livres = readLivres();
    const leLivre = livres.find(livre => { livre.id === id });
    leLivre.titre = req.body.titre;
    leLivre.auteur = req.body.auteur;
    leLivre.prix = req.body.prix;
    leLivre.description = req.body.description;
    saveLivres(livres);
    res.status(200).json(leLivre);
});

// Route pour supprimer un livre par rapport à son id

app.delete('/livres/:id', (req, res) => {
    const id = parseInt(req.params.id);
    livres.readLivres();
    const leLivre = livres.find(livre => { livre.id === id });
    if (leLivre) {
        livres.splice(livres.indexOf(leLivre), 1);
        saveLivres(livres);
    }
    res.status(200).json(livres);
});

app.listen(port, () => {
    console.log(`serveur en cours d'exécution sur le port ${port}`);
})