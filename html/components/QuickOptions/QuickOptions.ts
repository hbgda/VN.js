import { Component } from "../../../lib/Component"
import type { QuickMenu } from "../QuickMenu/QuickMenu"
import type { TextBox } from "../TextBox/TextBox"

export class QuickOptions extends Component {
    constructor(parent: HTMLElement, textBox: TextBox, quickMenu: QuickMenu) {
        super("QuickOptions", "quickoptions_component", parent)
        document.addEventListener("menu_clicked", () => {
            textBox.element.style.display = "none"
            this.element.style.display = "none"
            console.log(quickMenu.element)
            quickMenu.element.classList.toggle("visible")
        })
    }
}