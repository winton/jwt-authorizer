import { rotate } from "./rotate"
;(async (): Promise<void> => {
  // eslint-disable-next-line
  console.log(await rotate(process.argv[2]))
})()
