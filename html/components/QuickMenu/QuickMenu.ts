import { Component } from "../../../lib/Component"

export class QuickMenu extends Component {
    isOpen: boolean = false
    
    constructor(parent: HTMLElement) {
        super("QuickMenu", "quickmenu_component", parent)
    }

    toggle() {
        
    }
}