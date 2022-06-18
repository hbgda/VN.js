export function createTextEvent(name: string, text: string): SceneEvent {
    return {
        type: "text",
        data: {
            name, text
        }
    }
}

export function createPathEvent(pathName: string, branch: boolean = false): SceneEvent {
    return {
        type: "path",
        data: {
            pathName, branch
        }
    }
}

export function createCharacterStateEvent(charName: string, state: string): SceneEvent {
    return {
        type: "characterState",
        data: {
            charName, state
        }
    }
}

export function createSceneImageEvent(sceneImage: string): SceneEvent {
    return {
        type: "scene",
        data: {
            sceneImage
        }
    }
}

export function createChoiceEvent(prompt: string, options: ChoiceOption[]): SceneEvent {
    return {
        type: "choice",
        data: {
            prompt, options
        }
    }
}

export function createPromptEvent(prompt: string): SceneEvent {
    return {
        type: "prompt",
        data: {
            prompt
        }
    }
}