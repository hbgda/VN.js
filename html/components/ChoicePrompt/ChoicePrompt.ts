import { Component } from "../../../lib/Component";

export class ChoicePrompt extends Component {
    promptText: HTMLHeadingElement
    optionsContainer: HTMLDivElement

    constructor(parent: HTMLElement) {
        super("ChoicePrompt", "choiceprompt_component", parent)
        this.promptText = this.element.querySelector(".prompt") as HTMLHeadingElement
        this.optionsContainer = this.element.querySelector(".options") as HTMLDivElement
    }

    prompt(data: ChoiceEventData, cb: Function) {
        // console.log(data)
        this.promptText.textContent = data.prompt
        let optElements = data.options.map((opt, i) => {
            const btn = document.createElement("button")
            btn.textContent = opt.text
            btn.addEventListener("click", (e) => {
                e.stopPropagation()
                //document.dispatchEvent(new CustomEvent("choice_selected", {detail: {selectedIndex: i}}))
                cb(opt.event || undefined)
                this.promptText.textContent = ""
                this.optionsContainer.innerHTML = ""
                this.element.style.display = "none"
            })
            return btn
        })
        this.optionsContainer.append(...optElements)
        this.element.style.display = "flex"
    }
}