import {
  CustomAuthorizerResult,
  Statement,
} from "aws-lambda"

export function generatePolicy(
  principalId: string,
  effect: string,
  resource: string
): CustomAuthorizerResult {
  let statement: Statement, version: string

  if (effect && resource) {
    version = "2012-10-17"

    statement = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    }
  }

  const policyDocument = {
    Statement: statement ? [statement] : [],
    Version: version,
  }

  const authResponse: CustomAuthorizerResult = {
    policyDocument,
    principalId,
  }

  return authResponse
}
