import { UserData } from "../../../../src/entities/user-data";
import { InMemoryUserRepository } from "../../../../src/usecases/register-user-on-mailing-list/respository/in-memory-user-repository";

describe("In memory User repository", () => {
  it("should return null if user is not found", async () => {
    const users: UserData[] = [];
    const sut = new InMemoryUserRepository(users);
    const user = await sut.findUserByEmail("any@email.com");

    expect(user).toBeNull();
  });

  it("should return user if it is found in the repository", async () => {
    const users: UserData[] = [];
    const name = "any_name";
    const email = "any@email.com";

    const sut = new InMemoryUserRepository(users);

    await sut.add({ name, email });

    const user = await sut.findUserByEmail("any@email.com");

    expect(user.email).toBe("any@email.com");
  });

  it("should return all users in the repository", async () => {
    const users: UserData[] = [
      { name: "any_name", email: "any@email.com" },
      { name: "any_name2", email: "any2@email.com" },
    ];

    const sut = new InMemoryUserRepository(users);

    const returnedUsers = await sut.findAllUsers();

    expect(returnedUsers.length).toBe(2);
  });
});
