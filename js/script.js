// Fonction JS pour générer un tableau aléatoire de taille donnée et les chiffres seront compris entre 0 et 999
function genereTableauAleatoire(taille) {
    const randomArray = [];
    for (let i = 0; i < taille; i++) {
        randomArray.push(Math.floor(Math.random() * 1000));
    }
    return randomArray;
}

function triABulles(tableau) {
    const n = tableau.length;
    let tempsDebut = performance.now(); // Mesure le temps de début

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (tableau[j] > tableau[j + 1]) {
                const temp = tableau[j];
                tableau[j] = tableau[j + 1];
                tableau[j + 1] = temp;
            }
        }
    }

    let tempsFin = performance.now(); // Mesure le temps de fin
    return tempsFin - tempsDebut; // Retourne le temps d'exécution
}

function triParInsertion(tableau) {
    const n = tableau.length;
    let tempsDebut = performance.now(); // Mesurer le temps de début

    for (let i = 1; i < n; i++) {
        const valeurCourante = tableau[i];
        let j = i - 1;

        while (j >= 0 && tableau[j] > valeurCourante) {
            tableau[j + 1] = tableau[j];
            j--;
        }

        tableau[j + 1] = valeurCourante;
    }

    let tempsFin = performance.now(); // Mesurer le temps de fin
    return tempsFin - tempsDebut; // Retourner le temps d'exécution
}

function triFusion(tableau) {
    if (tableau.length <= 1) {
        return tableau; // Si le tableau est vide ou a une seule valeur, il est déjà trié.
    }

    const milieu = Math.floor(tableau.length / 2);
    const gauche = tableau.slice(0, milieu);
    const droite = tableau.slice(milieu);

    return fusionner(triFusion(gauche), triFusion(droite), milieu); // Correction ici
}

function fusionner(gauche, droite, milieu) {
    const tableau = [];
    let i = 0;
    let j = 0;

    while (i < gauche.length && j < droite.length) {
        if (gauche[i] < droite[j]) {
            tableau.push(gauche[i]);
            i++;
        } else {
            tableau.push(droite[j]);
            j++;
        }
    }

    return tableau.concat(gauche.slice(i), droite.slice(j));
}

// Déclarez le graphique en dehors de la fonction pour qu'il soit accessible globalement
const canvasGraphique = document.getElementById("graphique");
const graphique = new Chart(canvasGraphique, {
    type: "line",
    data: {
        labels: [],
        datasets: [],
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Taille du tableau',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Temps d\'exécution (ms)',
                },
            },
        },
    },
});

const taillesDeTableau = [10, 100, 1000, 10000, 100000];
const donneesTriBulles = [];
const donneesTriInsertion = [];
const donneesTriFusion = [];

for (const taille of taillesDeTableau) {
    const tableauAleatoire = genereTableauAleatoire(taille);

    const tempsTriBulles = triABulles([...tableauAleatoire]);
    donneesTriBulles.push({ taille: taille, temps: tempsTriBulles });

    const tempsTriInsertion = triParInsertion([...tableauAleatoire]);
    donneesTriInsertion.push({ taille: taille, temps: tempsTriInsertion });

    const tempsDebut = performance.now();
    triFusion([...tableauAleatoire]); // Tri fusion sans retourner le tableau
    const tempsFin = performance.now();
    const tempsExecution = tempsFin - tempsDebut;
    donneesTriFusion.push({ taille: taille, temps: tempsExecution });

    console.log(`Tri à bulles pour un tableau de taille ${taille}: ${tempsTriBulles} ms`);
    console.log(`Tri par insertion pour un tableau de taille ${taille}: ${tempsTriInsertion} ms`);
    console.log(`Tri fusion pour un tableau de taille ${taille}: ${tempsExecution} ms`);
}

// Récupérez le bouton pour comparer les tris
const btnComparerTris = document.getElementById("btnComparerTris");

// Ajoutez un gestionnaire d'événements de clic au bouton pour comparer les tris
btnComparerTris.addEventListener("click", () => afficherGraphiqueComparatif());

// Fonction pour afficher le graphique comparatif des trois tris
function afficherGraphiqueComparatif() {
    // Mettez à jour les données du graphique existant avec les trois ensembles de données
    graphique.data.labels = taillesDeTableau;
    graphique.data.datasets = [
        {
            label: "Tri à Bulles",
            data: donneesTriBulles.map((donnee) => donnee.temps),
            fill: false,
            borderColor: getColor("Tri à Bulles"),
            borderWidth: 1,
        },
        {
            label: "Tri par Insertion",
            data: donneesTriInsertion.map((donnee) => donnee.temps),
            fill: false,
            borderColor: getColor("Tri par Insertion"),
            borderWidth: 1,
        },
        {
            label: "Tri Fusion",
            data: donneesTriFusion.map((donnee) => donnee.temps),
            fill: false,
            borderColor: getColor("Tri Fusion"),
            borderWidth: 1,
        },
    ];

    // Mettez à jour le graphique
    graphique.update();
}

// Récupérez les boutons
const btnTriBulles = document.getElementById("btnTriBulles");
const btnTriInsertion = document.getElementById("btnTriInsertion");
const btnTriFusion = document.getElementById("btnTriFusion");

// Ajoutez des gestionnaires d'événements de clic aux boutons
btnTriBulles.addEventListener("click", () => afficherGraphique(donneesTriBulles, "Tri à Bulles"));
btnTriInsertion.addEventListener("click", () => afficherGraphique(donneesTriInsertion, "Tri par Insertion"));
btnTriFusion.addEventListener("click", () => afficherGraphique(donneesTriFusion, "Tri Fusion"));

// Fonction pour afficher le graphique en fonction des données et du label
function afficherGraphique(donnees, label) {
    // Mettez à jour les données du graphique existant
    graphique.data.labels = donnees.map((donnee) => donnee.taille);
    graphique.data.datasets = [
        {
            label: label,
            data: donnees.map((donnee) => donnee.temps),
            fill: false,
            borderColor: getColor(label),
            borderWidth: 1,
        },
    ];

    // Mettez à jour le graphique
    graphique.update();
}

// Fonction pour obtenir une couleur en fonction du label
function getColor(label) {
    switch (label) {
        case "Tri à Bulles":
            return "rgba(75, 192, 192, 1)";
        case "Tri par Insertion":
            return "rgba(255, 99, 132, 1)";
        case "Tri Fusion":
            return "rgba(255, 206, 86, 1)";
        default:
            return "rgba(0, 0, 0, 1)";
    }
}



// Fonction pour afficher le texte correspondant au graphique
function afficherTexte(descriptionId) {
    // Cacher tous les paragraphes
    const paragraphs = document.querySelectorAll('.description');
    paragraphs.forEach(paragraph => {
        paragraph.style.display = 'none';
    });

    // Afficher le paragraphe correspondant à l'ID
    const descriptionElement = document.getElementById(descriptionId);
    if (descriptionElement) {
        descriptionElement.style.display = 'block';
    }
}

// Ajoutez des gestionnaires d'événements de clic aux boutons
btnTriBulles.addEventListener("click", () => {
    afficherGraphique(donneesTriBulles, "Tri à Bulles");
    afficherTexte("descriptionTriBulles");
});

btnTriInsertion.addEventListener("click", () => {
    afficherGraphique(donneesTriInsertion, "Tri par Insertion");
    afficherTexte("descriptionTriInsertion");
});

btnTriFusion.addEventListener("click", () => {
    afficherGraphique(donneesTriFusion, "Tri Fusion");
    afficherTexte("descriptionTriFusion");
});

btnComparerTris.addEventListener("click", () => {
    afficherGraphiqueComparatif();
    afficherTexte("descriptionComparerTris");
});