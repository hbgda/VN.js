import { Component } from "../../../lib/Component"

export class QuickMenu extends Component {
    isOpen: boolean = false
    
    constructor(parent: HTMLElement) {
        super("QuickMenu", "quickmenu_component", parent)
    
        const menu = this.element.querySelector(".quick-menu")

        // Resume
        menu.children.item(0).addEventListener("click", () => document.dispatchEvent(new CustomEvent("toggle_ui", {detail: {enabled: true}})))
        
    }

    toggle() {
        if(this.isOpen) {
            this.element.classList.remove("visible")
            this.element.classList.add("closing")
            setTimeout(() => {
                this.element.classList.remove("closing")
                this.element.classList.add("closed")
            }, 400)
        }
        else {
            this.element.classList.remove("closed")
            this.element.classList.add("visible")
        }
        this.isOpen = !this.isOpen
    }
}