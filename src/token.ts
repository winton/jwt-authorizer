import jwt from "jsonwebtoken"

import { getSsmParameter } from "./ssm"

export async function token(sub: string): Promise<string> {
  const privateKey = await getSsmParameter("privateKey")
  return jwt.sign({ sub }, privateKey)
}
