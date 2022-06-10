// Node and browser
import { loadComponent } from '../../html/scripts/loader'
import { TextBox } from '../../html/components/TextBox/TextBox' 

window.addEventListener("DOMContentLoaded", () => {
    const t = new TextBox(document.body)
    t.setText("Ligma", [
        "Ligma balls lmao fucking idiot"
    ])
})