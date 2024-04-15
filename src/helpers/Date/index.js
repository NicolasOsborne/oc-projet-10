export const MONTHS = {
  1: 'janvier',
  2: 'février',
  3: 'mars',
  4: 'avril',
  5: 'mai',
  6: 'juin',
  7: 'juillet',
  8: 'août',
  9: 'septembre',
  10: 'octobre',
  11: 'novembre',
  12: 'décembre',
}

// La méthode getMonth permet de récupérer le mois à partir d'une date, avec un index où Janvier = 0. On ajoute donc +1 au résultat pour coincider avec les entrées du tableau MONTHS ci-dessus
export const getMonth = (date) => MONTHS[date.getMonth() + 1]
