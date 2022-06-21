import { left } from "../shared/either";
import { User } from "./User";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidNameError } from "./errors/invalid-name-error";

describe("User domain entity", () => {
  it("should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email";
    const error = User.create({ name: "any_name", email: invalidEmail })
      .value as Error;

    expect(error.name).toEqual("InvalidEmailError");
    expect(error.message).toEqual(`Invalid email: ${invalidEmail}.`);
  });

  it("should not create user with invalid name(too few characters)", () => {
    const invalidName = "0   ";

    const error = User.create({ name: invalidName, email: "any@mail.com" })
      .value as Error;

    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it("should not create user with invalid name(too many characters)", () => {
    const invalidName = "N".repeat(257);

    const error = User.create({ name: invalidName, email: "any@mail.com" })
      .value as Error;

    expect(error.name).toEqual("InvalidNameError");
    expect(error.message).toEqual(`Invalid name: ${invalidName}.`);
  });

  it("should create user with valid data", () => {
    const validName = "anyname";
    const validEmail = "any@mail.com";

    const user: User = User.create({
      name: validName,
      email: validEmail,
    }).value as User;

    expect(user.name).toEqual(validName);
    expect(user.email).toEqual(validEmail);
  });
});
