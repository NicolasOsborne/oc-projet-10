import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Field, { FIELD_TYPES } from '../../components/Field'
import Select from '../../components/Select'
import Button, { BUTTON_TYPES } from '../../components/Button'

const mockContactApi = () =>
  new Promise((resolve) => {
    // Changement de la durée du Timeout (passer de 1000 à 900ms) pour que la simulation de call à l'API se termine bien une fois que le message ait fini de s'afficher. Ceci corrige de potentielles erreurs de timing dans les tests.
    setTimeout(resolve, 900)
  })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false)

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault()
      setSending(true)
      // We try to call mockContactApi
      try {
        await mockContactApi()
        setSending(false)
        // Ajout de l'appel à onSuccess qui avait été oublié. Ceci corrige le bug d'affichage de la modale de succès de l'envoi du formulaire.
        onSuccess()
      } catch (err) {
        setSending(false)
        onError(err)
      }
    },
    [onSuccess, onError]
  )
  return (
    <form onSubmit={sendContact}>
      <div className='row'>
        <div className='col'>
          <Field placeholder='' label='Nom' />
          <Field placeholder='' label='Prénom' />
          <Select
            selection={['Personnel', 'Entreprise']}
            onChange={() => null}
            label='Personnel / Entreprise'
            type='large'
            titleEmpty
          />
          <Field placeholder='' label='Email' />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? 'En cours' : 'Envoyer'}
          </Button>
        </div>
        <div className='col'>
          <Field
            placeholder='message'
            label='Message'
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form
