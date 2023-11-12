function rechercheDichotomique(tableau, cible) {
  let debut = 0;
  let fin = tableau.length - 1;
  
  while (debut <= fin) {
    let milieu = Math.floor((debut + fin) / 2);
  
    if (tableau[milieu] === cible) {
      return milieu;
    } else if (tableau[milieu] < cible) {
      debut = milieu + 1;
    } else {
      fin = milieu - 1;
    }
  }
  return -1;
}
  
function rechercheNaive(tableau, cible) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i] === cible) {
      return i;
    }
  }
  
  return -1;
}
  
  function mesurerTempsRecherche(algoRecherche, tableau, cible) {
    const debut = performance.now();
    algoRecherche(tableau, cible);
    const fin = performance.now();
    return fin - debut;
  }
  
  const taillesTableau = [10, 100, 1000, 10000, 100000];
  const cibles = [4, 66, 432, 3048, 788542];
  
  const tempsDichotomique = [];
  const tempsNaif = [];
  
  taillesTableau.forEach((taille, index) => {
    const tableau = Array.from({ length: taille }, (_, i) => i + 1);
    tempsDichotomique.push(mesurerTempsRecherche(rechercheDichotomique, tableau, cibles[index]));
    tempsNaif.push(mesurerTempsRecherche(rechercheNaive, tableau, cibles[index]));
  });
  
  const ctx = document.getElementById('rechercher').getContext('2d');
  
  const rechercher = new Chart(ctx, {
    type: 'line',
    data: {
      labels: taillesTableau.map(String),
      datasets: [
        {
          label: 'Dichotomique',
          data: tempsDichotomique,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
        {
          label: 'Naïve',
          data: tempsNaif,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Taille du tableau',
          },
        },
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Temps de recherche (ms)',
          },
        },
      },
    },
  });