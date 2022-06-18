export default function Intro(handler: PathDataHandler) {
    handler.setScene("gen")
    handler.declareBranch("branch_no", branch_No)

    let chars = handler.characters
    chars["test"].say("TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest")
    chars["test2"].say("Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2Test2")

    handler.choice("Testing?", [
        {
            text: "Yes",
            event: {
                type: "text",
                data: {
                    name: "test",
                    text: "test choice test"
                }
            }
        },
        {
            text: "No",
            event: {
                type: "path",
                data: {
                    pathName: "branch_no",
                    branch: true
                }
            }
        }
    ])
}

// function branch_Yes(handler: PathDataHandler) {
//     handler.characters["test"].say("Testing!")
// }
function branch_No(handler: PathDataHandler) {
    handler.characters["test2"].say("Not testing!")
}