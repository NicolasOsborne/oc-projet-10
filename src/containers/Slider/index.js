import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'

import './style.scss'

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)
  const byDateDesc = data?.focus
    ? data?.focus.sort((evtA, evtB) =>
        // Inverser les conditions de la comparaison des dates pour que le résultat soit positif si A < B (ainsi, A sera placé après B) et négatif si A > B (ainsi, A sera placé avant B). Ceci corrige le bug de défilement dans l'ordre du plus récent au plus ancien.
        // Ajout de la valeur par défaut sous la forme d'un tableau vide [] dans le cas où data n'est pas encore récupéré. Ceci corrige les erreurs dans la console lorsque data n'a pas encore été récupéré au premier rendu de la page.
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
      )
    : []
  const nextCard = () => {
    // Définir la longueur du Slider pour qu'il corresponde à celle des données du tableau data.focus [0, 1, 2], soit 3 entrées. Ceci corrige le bug de la slide blanche en trop.
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    )
  }

  useEffect(() => {
    nextCard()
  })
  return (
    <div className='SlideCardList'>
      {byDateDesc?.map((event, idx) => (
        // Remplacement du fragment <> </> par une <div> à laquelle est attribuée une key unique. Correction des erreurs de la console.
        <div key={`${event.id}`}>
          <div
            // key={`${event.id}`}
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className='SlideCard__descriptionContainer'>
              <div className='SlideCard__description'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className='SlideCard__paginationContainer'>
            <div className='SlideCard__pagination'>
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.id}`}
                  type='radio'
                  name='radio-button'
                  value={radioIdx}
                  // Pour que les boutons radios suivent l'index de la slide en cours d'affichage, l'attribut "checked" est valide pour radioIdx === index de l'événement
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Slider
