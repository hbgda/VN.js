interface SceneInitOptions {
    height: number,
    width: number,
    backgroundColor?: string
}

interface AssetInfo {
    assetPath: string,
    characters: string[],
}

interface TextEventData {
    name: string
    text: string
}
interface CharacterStateEventData {
    charName: string
    state: string
    replace?: boolean
}
interface SceneImageEventData {
    sceneImage: string
}
interface ChoiceOption {
    text: string,
    event?: SceneEvent
}
interface ChoiceEventData {
    prompt: string
    options: ChoiceOption[]
}
interface PromptEventData {
    prompt: string
}
interface PathEventData {
    pathName: string
    branch?: boolean
}

type SceneEventType = "text"        | "characterState"        | "scene"             | "choice"        | "prompt"        | "path"
type SceneEventData = TextEventData | CharacterStateEventData | SceneImageEventData | ChoiceEventData | PromptEventData | PathEventData

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
    choice(prompt: string, opts: ChoiceOption[]): void

    characters: {[key: string]: Character}

    // Undecided on functionality
    prompt(prompt: string): void
}