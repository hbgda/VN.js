import type { CharacterHandler } from "../CharacterHandler/CharacterHandler";
import type { ChoicePrompt } from "../ChoicePrompt/ChoicePrompt";
import type { QuickMenu } from "../QuickMenu/QuickMenu";
import type { QuickOptions } from "../QuickOptions/QuickOptions";
import type { TextBox } from "../TextBox/TextBox";

export class SceneState {
    sceneImageSrc: string
    sceneImageElement: HTMLImageElement

    textBox: TextBox
    characterHandler: CharacterHandler
    choicePrompt: ChoicePrompt
    quickOptions: QuickOptions
    quickMenu: QuickMenu

    sceneEventData: SceneEvent[] = []
    eventIndex: number = -1

    blockProgression: boolean = false

    constructor(
        sceneImg: HTMLImageElement, 
        textBox: TextBox, 
        charHandler: CharacterHandler,
        choicePrompt: ChoicePrompt,
        quickOptions: QuickOptions,
        quickMenu: QuickMenu
        ) {
        this.sceneImageElement = sceneImg
        this.textBox = textBox
        this.characterHandler = charHandler
        this.choicePrompt = choicePrompt
        this.quickOptions = quickOptions
        this.quickMenu = quickMenu

        this.quickOptions.setBackFunction(() => this.previous())

        document.addEventListener("click", (e) => {
            if(!(e.target as HTMLElement).classList.contains("interactable")
                && !(e.target as HTMLElement).closest(".interactable")
            ) {
                if(this.textBox.isWriting) {
                    this.textBox.finishWrite()
                    return
                }
                
                this.next()
            }
        })
    }

    setData(data: SceneEvent[]) {
        this.blockProgression = false
        this.eventIndex = -1
        this.sceneEventData = data
    }

    next() {
        if (this.eventIndex >= this.sceneEventData.length - 1 || this.blockProgression) 
            return

        this.eventIndex++
        this.processEvent(this.sceneEventData[this.eventIndex])
    }
    previous() {
        if (this.eventIndex <= 0 || this.blockProgression)
            return

        this.eventIndex--
        this.processEvent(this.sceneEventData[this.eventIndex])
    }

    processEvent(event: SceneEvent) {
        switch (event.type) {
            case "text":
                this.textEvent(event.data as TextEventData)
                break
            case "characterState":
                this.characterStateEvent(event.data as CharacterStateEventData)
                break
            case "scene":
                this.sceneImageEvent(event.data as SceneImageEventData)
                this.next()
                break
            case "choice":
                this.choiceEvent(event.data as ChoiceEventData)
                break
            case "prompt":
                this.promptEvent(event.data as PromptEventData)
                break
            case "path":
                this.pathEvent(event.data as PathEventData)
                break
            default:
                console.error("Invalid event type " + event.type)
                break    
        }
    }

    textEvent(data: TextEventData) {
        this.textBox.write(data.name, data.text)
    }
    characterStateEvent(data: CharacterStateEventData) {

    }
    sceneImageEvent(data: SceneImageEventData) {
        if (data.sceneImage == this.sceneImageSrc)
            return

        this.sceneImageSrc = data.sceneImage
        this.sceneImageElement.src = this.sceneImageSrc
    }
    choiceEvent(data: ChoiceEventData) {
        this.blockProgression = true
        this.choicePrompt.prompt(data)
        document.addEventListener("choice_selected", (e: CustomEvent) => {
            let idx = e.detail.selectedIndex
            let event = data.options[idx].event
            console.log(idx, event)
            if (event) {
                this.processEvent(event)
            }
            this.blockProgression = false
        })
    }
    promptEvent(data: PromptEventData) {
        console.log("Unimplemented promptEvent")
    }
    pathEvent(data: PathEventData) {

    }
}