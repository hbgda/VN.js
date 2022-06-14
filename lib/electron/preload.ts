// Node and browser
import { loadComponent } from '../../html/scripts/loader'

import { TextBox } from '../../html/components/TextBox/TextBox' 
import { QuickOptions } from '../../html/components/QuickOptions/QuickOptions'
import { QuickMenu } from '../../html/components/QuickMenu/QuickMenu'
import { Character } from '../../html/components/Character/Character'

import { ipcRenderer } from 'electron'

window.addEventListener("DOMContentLoaded", () => {
    const t: TextBox = new TextBox(document.body)
    const qm = new QuickMenu(document.body)
    const q = new QuickOptions(document.body, t, qm)

    const sceneImage = document.querySelector(".scene-image") as HTMLImageElement

    document.addEventListener("toggle_ui", (e: CustomEvent) => {
        t.element.style.display = e.detail.enabled ? "block" : "none"
        q.element.style.display = e.detail.enabled ? "block" : "none"
        qm.toggle()
    })

    ipcRenderer.send("load-path", "intro")
    ipcRenderer.on("load-path-reply", (event, args) => {
        console.log(event, args)
        sceneImage.src = args["scene"]
        t.setData(args["characterText"])
        args["characterText"].forEach((c: any) => {
            let char = new Character(c["name"], document.body)
            char.setState(c["characterState"])
        })
    })
})
