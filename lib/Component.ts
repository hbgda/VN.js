import * as fs from 'fs'

export class Component {
    id: string
    html: string
    style: string
    name: string
    element: HTMLElement

    constructor(name: string, id: string, parent: HTMLElement) {
        
        let componentPath = `html/components/${name}`

        this.html = fs.readFileSync(componentPath + "/source.html").toString()
        this.style = fs.readFileSync(componentPath + "/style.css").toString()
        this.id = id

        if(!document.getElementById(this.id)) {
            const style = document.createElement("style")
            style.id = this.id
            style.append(this.style)
            let head = document.head || document.getElementsByTagName("head")[0]
            head.appendChild(style)
        }
        parent.insertAdjacentHTML("beforeend", this.html)
        this.element = parent.lastChild as HTMLElement
    }
}