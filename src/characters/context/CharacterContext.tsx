import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { CharacterAction, CharactersActionTypes, CharacterState } from "../state";

const initialState: CharacterState = {
    characters: new Map()
};

export const CharacterContext = createContext<{
    state: CharacterState;
    dispatch: Dispatch<CharacterAction>
}>({
    state: initialState,
    dispatch: () => null
});

const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
    switch (action.type) {
        case CharactersActionTypes.NEW:
            return {
                ...state,
                characters: new Map(action.payload.map(character => [character.id, character]))
            };
        case CharactersActionTypes.CREATE:
            return {
                ...state,
                characters: new Map([...state.characters, [action.payload.id, action.payload]])
            };
        case CharactersActionTypes.DELETE:
            state.characters.delete(action.payload);
            return {
                ...state,
                characters: new Map(state.characters)
            };
        case CharactersActionTypes.EDIT:
            state.characters.set(action.payload.id, action.payload);
            return {
                ...state,
                characters: new Map(state.characters)
            };
        default:
            return state;
    }
}

export const CharacterProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(characterReducer, initialState);

    return (
        <CharacterContext.Provider value={{state, dispatch}}>
            {children}
        </CharacterContext.Provider>
    );
};