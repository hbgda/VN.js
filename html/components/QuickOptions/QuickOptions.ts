import { Component } from "../../../lib/Component"
import type { QuickMenu } from "../QuickMenu/QuickMenu"
import type { TextBox } from "../TextBox/TextBox"

export class QuickOptions extends Component {
    constructor(parent: HTMLElement, textBox: TextBox, quickMenu: QuickMenu) {
        super("QuickOptions", "quickoptions_component", parent)

        // Menu
        this.element.children.item(0).addEventListener("click", () => {
            quickMenu.toggle()
        })

        // Back
        this.element.children.item(1).addEventListener("click", () => {
            textBox.back()
        })

        // Save

        // Load
    }
}