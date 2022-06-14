import { left } from "../shared/either";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { InvalidNameError } from "./errors/invalid-name-error";
import { User } from "./User";

describe("User domain entity", () => {
  it("should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email";
    const error = User.create({ name: "any_name", email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });

  it("should not create user with invalid name(too few characters)", () => {
    const invalidName = "0   ";

    const error = User.create({ name: invalidName, email: "any@mail.com" });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  it("should not create user with invalid name(too many characters)", () => {
    const invalidName = "N".repeat(257);

    const error = User.create({ name: invalidName, email: "any@mail.com" });

    expect(error).toEqual(left(new InvalidNameError()));
  });
});
