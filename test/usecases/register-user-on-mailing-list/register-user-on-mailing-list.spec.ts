import { UserData } from "../../../src/entities/user-data";
import { UserRepository } from "../../../src/usecases/ports/user-repository";
import { RegisterUserOnMailingList } from "../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list";
import { InMemoryUserRepository } from "../../../src/usecases/register-user-on-mailing-list/respository/in-memory-user-repository";

describe("Register user on mailing list use case", () => {
  test("should add user with complete data to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );

    const name = "any_name";
    const email = "any@email.com";

    const response = await useCase.registerUserOnMailingList({ name, email });

    const user = repo.findUserByEmail("any@email.com");

    expect((await user).name).toBe("any_name");
    expect(response.value.name).toBe("any_name");
  });
  test("should not add user with invalid email to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );

    const name = "any_name";
    const invalidEmail = "invalidemail";

    const response = (
      await useCase.registerUserOnMailingList({
        name,
        email: invalidEmail,
      })
    ).value as Error;

    const user = await repo.findUserByEmail("any@email.com");

    expect(user).toBeNull();

    expect(response.name).toEqual("InvalidEmailError");
    expect(response.message).toEqual(`Invalid email: ${invalidEmail}.`);
  });

  test("should not add user with invalid name to mailing list", async () => {
    const users: UserData[] = [];
    const repo: UserRepository = new InMemoryUserRepository(users);
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
      repo
    );

    const invalidName = "i   ";
    const email = "any@mail.com";

    const response = (
      await useCase.registerUserOnMailingList({
        name: invalidName,
        email,
      })
    ).value as Error;

    const user = await repo.findUserByEmail("any@email.com");

    expect(user).toBeNull();

    expect(response.name).toEqual("InvalidNameError");
  });
});
