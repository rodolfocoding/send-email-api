import { left } from "../shared/either";
import { InvalidEmailError } from "./errors/invalid-email-error";
import { User } from "./User";

describe("User domain entity", () => {
  it("should not create user with invalid e-mail address", () => {
    const invalidEmail = "invalid_email";
    const error = User.create({ name: "any_name", email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });
});
