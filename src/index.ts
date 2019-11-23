import {
  CustomAuthorizerResult,
  CustomAuthorizerEvent,
} from "aws-lambda"

import cookie from "cookie"
import { verify } from "jsonwebtoken"

import { generatePolicy } from "./generatePolicy"
import { getSsmParameter } from "./ssm"

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

  const privateKey = await getSsmParameter("privateKey")

  try {
    const decoded = verify(token, privateKey)

    return generatePolicy(
      decoded["sub"],
      "Allow",
      event.methodArn
    )
  } catch (err) {
    return "Unauthorized"
  }
}
