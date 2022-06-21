import { createPathEvent, createTextEvent } from "../lib/Event"

export default function Intro(handler: PathDataHandler) {
    handler.setScene("gen")
    handler.declareBranch("branch_no", branch_No)

    let chars = handler.characters

    chars["test"].say("TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest", "neutral")
    chars["test2"].say("Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2", "neutral")

    handler.choice("Testing?", [
        {
            text: "Yes",
            event: createTextEvent("Test", "test choice test")
        },
        {
            text: "No",
            event: createPathEvent("branch_no", true)
        }
    ])

    chars["test2"].say("Switch to new path?")
    handler.choice("Switch to new path?", [
        {
            text: "Yes",
            event: createPathEvent("test")
        },
        {
            text: "No",
            event: createTextEvent("Test", "Didn't switch path!")
        }
    ])
}

// function branch_Yes(handler: PathDataHandler) {
//     handler.characters["test"].say("Testing!")
// }
function branch_No(handler: PathDataHandler) {
    handler.characters["test2"].say("Not testing!")
}