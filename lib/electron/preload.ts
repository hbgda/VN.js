// Node and browser

import { TextBox } from '../../html/components/TextBox/TextBox' 
import { QuickOptions } from '../../html/components/QuickOptions/QuickOptions'
import { QuickMenu } from '../../html/components/QuickMenu/QuickMenu'
import { Character } from '../../html/components/Character/Character'
import { SceneState } from '../../html/components/SceneState/SceneState'
import { CharacterHandler } from '../../html/components/CharacterHandler/CharacterHandler'
import { ChoicePrompt } from '../../html/components/ChoicePrompt/ChoicePrompt'

import { ipcRenderer } from 'electron'


function loadPath(pathName: string, branch: boolean = false): SceneEvent[] {
    const data = ipcRenderer.sendSync(branch ? "load-branch" : "load-path", pathName)
    return (typeof data === "string" ? [] : data)
}

window.addEventListener("DOMContentLoaded", () => {
    const textBox = new TextBox(document.body)
    const quickMenu = new QuickMenu(document.body)
    const quickOptions = new QuickOptions(document.body, textBox, quickMenu)
    const sceneImage = document.querySelector(".scene-image") as HTMLImageElement
    const charHandler = new CharacterHandler()
    const choicePrompt = new ChoicePrompt(document.body)
    
    const sceneState = new SceneState(sceneImage, textBox, charHandler, choicePrompt, quickOptions, quickMenu)

    document.addEventListener("toggle_ui", (e: CustomEvent) => {
        textBox.element.style.display = e.detail.enabled ? "block" : "none"
        quickOptions.element.style.display = e.detail.enabled ? "block" : "none"
        quickMenu.toggle()
    })

    document.addEventListener("load_path", (e: CustomEvent) => {
        const { pathName, branch } = e.detail
        let data = loadPath(pathName, branch)
        sceneState.setData(data)
        sceneState.next()
    })

    let data = loadPath("intro")
    sceneState.setData(data)
    sceneState.next()

    // sceneImage.src = data["scene"]
    // t.setData(data["characterText"])
    // data["characterText"].forEach((c: any) => {
    //     let char = new Character(c["name"], document.body)
    //     char.setState(c["characterState"])
    // })
})
