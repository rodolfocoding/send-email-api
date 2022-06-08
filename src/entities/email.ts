export class Email {
  static validate (email: string): boolean {
    if (!email) {
      return false
    }

    const [local] = email.split('@')

    return !(local.length > 64)
  }
}
