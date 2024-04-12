/**
 * @jest-environment jsdom
 */

import {
  fireEvent,
  getAllByTestId,
  getByTestId,
  render,
  screen,
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

describe('When a page is created', () => {
  it('a list of events is displayed', async () => {
    // to implement
    render(<Home />)
    expect(getByTestId(document.body, 'events-list-testid')).toBeInTheDocument()
  })

  it('a list a people is displayed', async () => {
    // to implement
    render(<Home />)
    expect(getByTestId(document.body, 'people-list-testid')).toBeInTheDocument()
    await screen.findByText('Samira')
    await screen.findByText('Jean-baptiste')
    await screen.findByText('Alice')
    await screen.findByText('Luís')
    await screen.findByText('Christine')
    await screen.findByText('Isabelle')

    // ou alors :
    const peopleCards = screen.getAllByTestId('people-card-testid')
    expect(peopleCards.length).toBeGreaterThan(0)
  })

  it('a footer is displayed', async () => {
    // to implement
    render(<Home />)
    expect(getByTestId(document.body, 'footer-testid')).toBeInTheDocument()
    await screen.findByText('Notre dernière prestation')
    await screen.findByText('Contactez-nous')
  })

  it('an event card, with the last event, is displayed', async () => {
    // to implement
    render(<Home />)
    expect(
      getByTestId(document.body, 'last-event-card-testid')
    ).toBeInTheDocument()
  })
})
