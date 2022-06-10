// Node and browser
import { loadComponent } from '../../html/scripts/loader'

import { TextBox } from '../../html/components/TextBox/TextBox' 
import { QuickOptions } from '../../html/components/QuickOptions/QuickOptions'


window.addEventListener("DOMContentLoaded", () => {
    const t = new TextBox(document.body)
    t.setText("Mr White", [
        "Jesse, I have ligma...",
        "Ligma balls lmao rolled"
    ])
    const q = new QuickOptions(document.body)
})