import AWS, { SSM } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

if (!AWS.config.region) {
  AWS.config.update({ region: "us-east-1" })
}

const ssm = new SSM()

export async function getSsmParameter(
  key: string
): Promise<string> {
  const request = await ssm
    .getParameter({
      Name: `/jwt-authorizer-${process.env.STAGE ||
        "dev"}/${key}`,
    })
    .promise()

  return request.Parameter.Value
}

export async function setSsmParameter(
  key: string,
  value: string
): Promise<
  PromiseResult<SSM.PutParameterResult, AWS.AWSError>
> {
  return await ssm
    .putParameter({
      Name: `/jwt-authorizer-${process.env.STAGE ||
        "dev"}/${key}`,
      Type: "String",
      Value: value,
      Overwrite: true,
    })
    .promise()
}
