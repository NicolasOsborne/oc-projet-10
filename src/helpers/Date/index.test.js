import { getMonth } from './index'

describe('Date helper', () => {
  describe('When getMonth is called', () => {
    it('the function returns janvier for 2022-01-01 as date', () => {
      // Vérifier que la méthode getMonth retourne bien "janvier" pour la date du 01 janvier 2022
      const date = new Date('2022-01-01')
      expect(getMonth(date)).toBe('janvier')
    })

    it('the function returns juillet for 2022-07-08 as date', () => {
      // Vérifier que la méthode getMonth retourne bien "juillet" pour la date du 08 juillet 2022
      const date = new Date('2022-07-08')
      expect(getMonth(date)).toBe('juillet')
    })

    it("the function doesn't return august for 2022-09-23 as date", () => {
      // Vérifier que la méthode getMonth ne retourne pas "août" pour la date du 23 septembre 2022
      const date = new Date('2022-09-23')
      expect(getMonth(date)).not.toBe('august')
    })
  })
})
