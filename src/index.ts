import {
  CustomAuthorizerResult,
  CustomAuthorizerEvent,
} from "aws-lambda"

import cookie from "cookie"
import JwtSsm from "jwt-ssm"

import { generatePolicy } from "./generatePolicy"

export async function authorizer(
  event: CustomAuthorizerEvent
): Promise<string | CustomAuthorizerResult> {
  let token: string

  if (event.headers && event.headers.Cookie) {
    token = cookie.parse(event.headers.Cookie).token
  }

  if (!token) {
    return "Unauthorized"
  }

  const decoded = JwtSsm.decode(token)

  if (typeof decoded !== "object") {
    return "Unauthorized"
  }

  try {
    JwtSsm.verify(
      `/jwtPrivateKeys/${decoded["sub"]}`,
      token
    )

    return generatePolicy(
      decoded["sub"],
      "Allow",
      event.methodArn
    )
  } catch (err) {
    return "Unauthorized"
  }
}
