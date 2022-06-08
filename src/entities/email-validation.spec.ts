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

  it('should not accpet local part than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com'

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accpet email larger than 320 chars', () => {
    const email =
      'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })
})
