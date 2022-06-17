interface SceneInitOptions {
    height: number,
    width: number,
    backgroundColor?: string
}

interface LoadedPathData {
    
}


interface TextEventData {
    name: string
    text: string
}
interface CharacterStateEventData {
    name: string
    state: string
}
interface SceneImageEventData {
    sceneImage: string
}
interface ChoiceOption {
    text: string,
    branch?: string
}
interface ChoiceEventData {
    options: ChoiceOption[]
}
interface PromptEventData {
    prompt: string
}

type SceneEventType = "text"        | "characterState"        | "scene"             | "choice"        | "prompt" 
type SceneEventData = TextEventData | CharacterStateEventData | SceneImageEventData | ChoiceEventData | PromptEventData

interface SceneEvent {
    type: SceneEventType,
    data: SceneEventData
}

interface Character {
    say(text: string, state?: string): void
}

interface PathFunction {
    (handler: PathDataHandler): void
}

interface PathDataHandler {
    setScene(scene: string): void,
    declareBranch(id: string, path: PathFunction): void,
    choice(opts: ChoiceOption[]): void

    characters: {[key: string]: Character}

    // Undecided on functionality
    prompt(prompt: string): void
}