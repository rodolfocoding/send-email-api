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
    const users = this.repository.filter((user) => {
      return user.email === email
    })

    if (users.length > 0) {
      return users[0]
    }

    return null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (email: string): Promise<boolean> {
    return !!(await this.findUserByEmail(email))
  }
}
