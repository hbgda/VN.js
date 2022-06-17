// Node and browser
import { loadComponent } from '../../html/scripts/loader'

import { TextBox } from '../../html/components/TextBox/TextBox' 
import { QuickOptions } from '../../html/components/QuickOptions/QuickOptions'
import { QuickMenu } from '../../html/components/QuickMenu/QuickMenu'
import { Character } from '../../html/components/Character/Character'
import { SceneState } from '../../html/components/SceneState/SceneState'
import { CharacterHandler } from '../../html/components/CharacterHandler/CharacterHandler'

import { ipcRenderer } from 'electron'

window.addEventListener("DOMContentLoaded", () => {
    const textBox = new TextBox(document.body)
    const quickMenu = new QuickMenu(document.body)
    const quickOptions = new QuickOptions(document.body, textBox, quickMenu)
    const sceneImage = document.querySelector(".scene-image") as HTMLImageElement
    const charHandler = new CharacterHandler()
    
    const sceneState = new SceneState(sceneImage, textBox, charHandler)

    document.addEventListener("toggle_ui", (e: CustomEvent) => {
        textBox.element.style.display = e.detail.enabled ? "block" : "none"
        quickOptions.element.style.display = e.detail.enabled ? "block" : "none"
        quickMenu.toggle()
    })

    let data = ipcRenderer.sendSync("load-path", "intro")
    console.log(data)
    
    sceneState.setData(data)
    sceneState.next()

    // sceneImage.src = data["scene"]
    // t.setData(data["characterText"])
    // data["characterText"].forEach((c: any) => {
    //     let char = new Character(c["name"], document.body)
    //     char.setState(c["characterState"])
    // })
})
