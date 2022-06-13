import type { Character } from '../lib/Character'

export default function Intro(chars: {
    [key: string]: Character
},
    setScene: Function
) {
    setScene("gen")
    chars["test"].say("TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest")
}