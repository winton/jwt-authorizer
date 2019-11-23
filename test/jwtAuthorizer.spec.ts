import expect from "./expect"
import { authorizer } from "../src"

describe("jwtAuthorizer", () => {
  it("should exist", () => {
    expect(authorizer).toBeInstanceOf(Function)
  })

  it("should assert", () => {
    expect(true).toBe(true)
  })
})
