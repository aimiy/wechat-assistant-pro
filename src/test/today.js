import { getIsWorkToday } from "../api/config.js"
import superagent from '../superagent/index.cjs'
import utils from "../utils/index.cjs"




console.log(await getIsWorkToday())