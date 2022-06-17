import { Component } from '../../../lib/Component'


export class TextBox extends Component {
    charName: string
    text: string
    textIndex: number = -1

    nameField: HTMLHeadingElement
    textField: HTMLParagraphElement

    addTextInterval: NodeJS.Timer
    addTextDelay: number = 50
    isWriting: boolean = false

    data: Array<{name: string, text: string, characterState?: string}> = []
    dataIndex: number = -1

    constructor(parent: HTMLElement) {
        super("TextBox", "textbox_component", parent)
        this.nameField = this.element.querySelector(".name > p")
        this.textField = this.element.querySelector(".text")
    }

    finishWrite() {
        clearInterval(this.addTextInterval)
        this.isWriting = false
        this.textField.textContent = this.text
    }

    setText(name: string, text: string) {
        this.text = text
        this.nameField.textContent = name
        this.textField.textContent = ""
        this.isWriting = true
        let idx = 0
        this.addTextInterval = setInterval(() => {
            this.textField.textContent += text[idx]
            idx++
            if(idx >= text.length) {
                clearInterval(this.addTextInterval)
                this.isWriting = false
            }
        }, this.addTextDelay)
    }

    // setData(texts: [{name: string, text: string, characterState?: string}]) {
    //     console.log(texts)
    //     this.data = texts
    //     this.dataIndex = -1
    //     this.next()
    // }

    // setText(name: string, text: string) {
    //     this.charName = name
    //     this.text = text

    //     this.nameField.textContent = this.charName
    //     this.textIndex = -1
    //     this.next()
    // }

    // back() {
    //     if(!this.data || this.dataIndex <= 0) 
    //         return

    //     clearInterval(this.addTextInterval)
    //     this.dataIndex--
    //     this.nameField.textContent = this.data[this.dataIndex].name
    //     this.textField.textContent = this.data[this.dataIndex].text
    //     this.isWriting = false
    // }

    // next() {
    //     if(!this.data || this.dataIndex >= this.data.length) 
    //         return
        
            
    //     if(this.isWriting) {
    //         clearInterval(this.addTextInterval)
    //         this.textField.textContent = this.data[this.dataIndex].text
    //         this.isWriting = false
    //         this.textIndex += 1
    //         return
    //     }
            
    //     this.dataIndex += 1

    //     console.log(this.data[this.dataIndex])
            
    //     let idx = 0
    //     let name = this.data[this.dataIndex].name
    //     let text = this.data[this.dataIndex].text
    //     let state = this.data[this.dataIndex].characterState
    //     this.nameField.textContent = name
    //     this.textField.textContent = ""
    //     let charImg = document.querySelector(`#char_${name} > img`) as HTMLImageElement
    //     charImg.src = state
    //     this.isWriting = true
    //     this.addTextInterval = setInterval(() => {
    //         this.textField.textContent += text[idx]
    //         idx++
    //         if(idx >= text.length) {
    //             clearInterval(this.addTextInterval)
    //             this.isWriting = false
    //         }
    //     }, this.addTextDelay)
    // }
}
