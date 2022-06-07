import { Email } from './email'

describe('Email valdiation', () => {
  it('should not accpet null strings', () => {
    const email = null

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accpet undefined', () => {
    const email = undefined

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accpet empty strings', () => {
    const email: string = ''

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should accpet valid email', () => {
    const email = 'any@email.com'

    expect(Email.validate(email)).toBeTruthy()
  })
})
