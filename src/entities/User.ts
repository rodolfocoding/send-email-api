import { Either, left, right } from "../shared/either";
import { Email } from "./email";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidNameError } from "./errors/invalid-name-error";
import { Name } from "./name";
import { UserData } from "./user-data";

export class User {
  public readonly email: string;
  public readonly name: string;

  private constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const emailOrError = Email.create(userData.email);
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const name: string = nameOrError.value.name;
    const email: string = emailOrError.value.email;

    return right(new User(name, email));
  }
}
