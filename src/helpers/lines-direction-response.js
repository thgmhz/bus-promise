import axios from 'axios'
import { API } from '../constants'


export default function linesDirectionResponse (data) {
  return data.map(line => ({
    lineId: line.cl,
    circular: line.lc,
    displaySign: line.lt,
    direction: line.sl,
    type: line.tl,
    mainTerminal: line.tp,
    secondaryTerminal: line.ts
  }))
}
