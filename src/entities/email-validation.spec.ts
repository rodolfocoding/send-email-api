import { Email } from './email'

describe('Email valdiation', () => {
  it('should not accept null strings', () => {
    const email = null

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept undefined', () => {
    const email = undefined

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not accept empty strings', () => {
    const email: string = ''

    expect(Email.validate(email)).toBeFalsy()
  })

  it('should accept valid email', () => {
    const email = 'any@email.com'

    expect(Email.validate(email)).toBeTruthy()
  })

  it('should not accept local part than 64 chars', () => {
    const local = 'l'.repeat(65) + '@mail.com'

    expect(Email.validate(local)).toBeFalsy()
  })

  it('should not accept email larger than 320 chars', () => {
    const email =
      'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  it('should not domain part larger than 255 chars', () => {
    const domain = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(domain)).toBeFalsy()
  })

  it('should not accept empty local part', () => {
    const local = '@mail.com'

    expect(Email.validate(local)).toBeFalsy()
  })

  it('should not accept empty domain part', () => {
    const domain = 'any@'

    expect(Email.validate(domain)).toBeFalsy()
  })

  it('should not domain with a part larger than 63 chars', () => {
    const domain = 'any@' + 'd'.repeat(64) + '.com'

    expect(Email.validate(domain)).toBeFalsy()
  })
})
