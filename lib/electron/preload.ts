// Node and browser
import { loadComponent } from '../../html/scripts/loader'

import { TextBox } from '../../html/components/TextBox/TextBox' 
import { QuickOptions } from '../../html/components/QuickOptions/QuickOptions'
import { QuickMenu } from '../../html/components/QuickMenu/QuickMenu'

window.addEventListener("DOMContentLoaded", () => {
    const t: TextBox = new TextBox(document.body)
    t.setText("Mr White", [
        "Jesse, I have ligma...",
        "Ligma balls lmao rolled"
    ])
    const qm = new QuickMenu(document.body)
    
    const q = new QuickOptions(document.body, t, qm)
})
