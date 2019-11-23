import { SSM, AWSError } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"
import crypto from "crypto"

import { setSsmParameter } from "./ssm"

export async function rotate(
  privateKey: string
): Promise<
  PromiseResult<SSM.PutParameterResult, AWSError>
> {
  const date = new Date().valueOf().toString()
  const random = Math.random().toString()

  const key =
    privateKey ||
    crypto
      .createHash("sha256")
      .update(date + random)
      .digest("hex")

  return await setSsmParameter("privateKey", key)
}
