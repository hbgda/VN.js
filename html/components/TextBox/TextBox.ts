import { Component } from '../../../lib/Component'


export class TextBox extends Component {
    charName: string
    texts: string[]
    textIndex: number = -1

    nameField: HTMLHeadingElement
    textField: HTMLParagraphElement

    addTextInterval: NodeJS.Timer
    addTextDelay: number = 50
    isWriting: boolean = false

    constructor(parent: HTMLElement) {
        super("TextBox", "textbox_component", parent)
        this.nameField = this.element.querySelector(".name > p")
        this.textField = this.element.querySelector(".text")

        document.addEventListener("click", (e) => {
            if(!(e.target as HTMLElement).classList.contains("interactable")
                && !(e.target as HTMLElement).closest(".interactable")
            ) {
                this.next()
            }
        })
    }

    setText(name: string, texts: string[]) {
        this.charName = name
        this.texts = texts

        this.nameField.textContent = this.charName
        this.textIndex = -1
        this.next()
    }

    back() {
        if(!this.texts || this.textIndex <= 0) 
            return

        clearInterval(this.addTextInterval)
        this.textIndex--
        this.textField.textContent = this.texts[this.textIndex]
        this.isWriting = false
    }

    next() {
        if(!this.texts || this.textIndex >= this.texts.length) 
            return
        
            
        if(this.isWriting) {
            clearInterval(this.addTextInterval)
            this.textField.textContent = this.texts[this.textIndex]
            this.isWriting = false
            this.textIndex += 1
            return
        }
            
        this.textIndex += 1
            
        let idx = 0
        this.textField.textContent = ""
        this.isWriting = true
        this.addTextInterval = setInterval(() => {
            this.textField.textContent += this.texts[this.textIndex][idx]
            idx++
            if (idx >= this.texts[this.textIndex].length) {
                clearInterval(this.addTextInterval)
                this.isWriting = false
            }
        }, this.addTextDelay)
    }
}
