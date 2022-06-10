import { Component } from '../../../lib/Component'

export class TextBox extends Component {
    html: string
    style: string

    name: string
    texts: string[]
    textIndex: number = 0

    nameField: HTMLHeadingElement
    textField: HTMLParagraphElement

    addTextInterval: NodeJS.Timer
    addTextDelay: number = 50

    constructor(parent: HTMLElement) {
        super("TextBox", "textbox_component", parent)
        this.nameField = this.element.querySelector(".name > p")
        this.textField = this.element.querySelector(".text")

        let clickHandler = document.createElement("div")
        clickHandler.setAttribute("style", `
            position: absolute;
            width: 100vw;
            height: 100vh;
            z-index: 2;
            top: 0;
            left: 0;
        `)
        clickHandler.addEventListener("click", () => this.next())
        document.body.prepend(clickHandler)
    }

    setText(name: string, texts: string[]) {
        this.name = name
        this.texts = texts

        this.nameField.textContent = this.name
        this.textIndex = 0
        this.next()
    }

    next() {
        if(!this.texts || this.textIndex >= this.texts.length) 
            return
        
        let idx = 0
        this.textField.textContent = ""
        this.addTextInterval = setInterval(() => {
            this.textField.textContent += this.texts[this.textIndex][idx]
            idx++
            if (idx >= this.texts[this.textIndex].length) {
                clearInterval(this.addTextInterval)
                this.textIndex += 1
            }
        }, this.addTextDelay)
    }
}
