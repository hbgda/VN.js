import type { CharacterHandler } from "../CharacterHandler/CharacterHandler";
import type { TextBox } from "../TextBox/TextBox";

export class SceneState {
    sceneImageSrc: string
    sceneImageElement: HTMLImageElement

    textBox: TextBox
    characterHandler: CharacterHandler

    sceneEventData: SceneEvent[] = []
    eventIndex: number = -1

    constructor(sceneImg: HTMLImageElement, textBox: TextBox, charHandler: CharacterHandler) {
        this.sceneImageElement = sceneImg
        this.textBox = textBox
        this.characterHandler = charHandler

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
        this.sceneEventData = data
    }

    next() {
        if (this.eventIndex >= this.sceneEventData.length) 
            return

        this.eventIndex++
        this.currentEvent()
    }
    previous() {
        if (this.eventIndex <= 0)
            return

        this.eventIndex--
        this.currentEvent()
    }

    currentEvent() {
        let event = this.sceneEventData[this.eventIndex]
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
            default:
                console.error("Invalid event type " + event.type)
                break    
        }
    }

    textEvent(data: TextEventData) {
        this.textBox.setText(data.name, data.text)
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

    }
    promptEvent(data: PromptEventData) {
        console.log("Unimplemented promptEvent")
    }

}