/**
 * @jest-environment jsdom
 */

import {
  fireEvent,
  getAllByTestId,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import Home from './index'

describe('When Form is created', () => {
  it('a list of fields card is displayed', async () => {
    render(<Home />)
    await screen.findByText('Email')
    await screen.findByText('Nom')
    await screen.findByText('Prénom')
    await screen.findByText('Personnel / Entreprise')
  })

  describe('and a click is triggered on the submit button', () => {
    it('the success message is displayed', async () => {
      render(<Home />)
      fireEvent(
        await screen.findByText('Envoyer'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      )
      await screen.findByText('En cours')
      await screen.findByText('Message envoyé !')
    })
  })
})

describe('When the Home page is created', () => {
  // Appeler le rendu de la page avant chaque test
  beforeEach(() => {
    render(<Home />)
  })

  describe('In the event section', () => {
    it('a list of events is displayed', async () => {
      // Vérifier que la section "Nos réalisations" est affichée
      expect(
        getByTestId(document.body, 'events-list-testid')
      ).toBeInTheDocument()

      // Vérifier que le bon nombre de cards sont affichées
      waitFor(() => {
        const eventCards = screen.getAllByTestId('card-testid')
        expect(eventCards.length).toBe(9)
      })
    })
  })

  describe('In the team section', () => {
    it('a list a people is displayed', async () => {
      // Vérifier que la section "Notre équipe" est affichée
      expect(
        getByTestId(document.body, 'people-list-testid')
      ).toBeInTheDocument()

      // Vérifier que le bon nombre de personnes est affiché
      const peopleCards = screen.getAllByTestId('people-card-testid')
      expect(peopleCards.length).toBe(6)
    })
  })

  describe('In the footer section', () => {
    // Vérifier que le Footer est affiché
    it('a footer is displayed', async () => {
      expect(getByTestId(document.body, 'footer-testid')).toBeInTheDocument()
    })

    // Vérifier que la colonne dédiée à la dernière prestation est affichée
    it('a column with the last event is displayed', async () => {
      expect(
        getByTestId(document.body, 'footer-prestation-testid')
      ).toBeInTheDocument()
      expect(
        await screen.findByText('Notre dernière prestation')
      ).toBeInTheDocument()
    })

    // Vérifier que la card contenant le dernier événement est affichée dans le footer
    it('an event card, with the last event, is displayed', () => {
      waitFor(() => {
        // Vérifier que la card est bien affichée
        const lastEventCard = screen.getByTestId('last-event-testid')
        expect(lastEventCard).toBeInTheDocument()

        // Vérifier que la card est bien à la taille "small"
        expect(lastEventCard).toHaveClass('EventCard--small')

        // Vérifier que la card contient bien une image
        const lastEventImage = lastEventCard.querySelector('img')
        expect(lastEventImage).toBeInTheDocument()

        // Vérifier que la card contient bien les bonnes informations (titre, date et type)
        expect(lastEventCard).toHaveTextContent('Conférence #ProductCON')
        expect(lastEventCard).toHaveTextContent('avril')
        expect(lastEventCard).toHaveTextContent('soirée entreprise')
      })
    })

    // Vérifier que la colonne dédiée aux informations de contact est affichée
    it('a column with the contact information is displayed', async () => {
      expect(
        getByTestId(document.body, 'footer-contact-testid')
      ).toBeInTheDocument()
      expect(await screen.findByText('Contactez-nous')).toBeInTheDocument()
    })

    // Vérifier que les informations de contact sont affichées
    it('the contact information is displayed', async () => {
      expect(
        await screen.findByText('45 avenue de la République, 75000 Paris')
      ).toBeInTheDocument()
      expect(await screen.findByText('01 23 45 67 89')).toBeInTheDocument()
      expect(
        await screen.findByText('contact@724events.com')
      ).toBeInTheDocument()
    })

    // Vérifier que les icônes de réseaux sociaux sont affichées
    it('the social network icons are displayed', async () => {
      const footerSocialIcons = screen.getAllByTestId(
        'footer-social-icon-testid'
      )
      expect(footerSocialIcons).toHaveLength(4)
    })

    // Vérifier que la colonne dédiée au résumé de présentation de l'agence est affichée
    it("a column with the agency's description is displayed", async () => {
      expect(
        getByTestId(document.body, 'footer-description-testid')
      ).toBeInTheDocument()
      expect(
        await screen.findByText(
          "Une agence événementielle propose des prestations de service spécialisées dans la conception et l'organisation de divers événements tels que des événements festifs, des manifestations sportives et culturelles, des événements professionnels"
        )
      ).toBeInTheDocument()
    })
  })
})
