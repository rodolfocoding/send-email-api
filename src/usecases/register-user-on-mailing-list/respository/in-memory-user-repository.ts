import { UserRepository } from '@/usecases/ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const userExists = await this.exists(user.email)

    if (!userExists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const found = this.repository.find((user) => user.email === email)

    return found || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (email: string): Promise<boolean> {
    return !!(await this.findUserByEmail(email))
  }
}
