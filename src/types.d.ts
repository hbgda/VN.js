interface SceneInitOptions {
    height: number,
    width: number,
    backgroundColor?: string
}

interface LoadedPathData {
    
}

interface ChoiceOption {
    text: string,
    branch?: string
}

type SceneEventType = "text"                       | "characterState"              | "scene"           | "choice"                  | "prompt" 
type SceneEventData = {name: string, text: string} | {name: string, state: string} | {sceneId: string} | {options: ChoiceOption[]} | {prompt: string}

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