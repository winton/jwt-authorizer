import { token } from "./token"
;(async (): Promise<void> => {
  // eslint-disable-next-line
  console.log(await token(process.argv[2]))
})()
