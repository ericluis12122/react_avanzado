import { Character } from "../models";

export enum CharactersActionTypes {
    NEW = 'NEW',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
    EDIT = 'EDIT', 
}

export interface CharacterState {
    characters: Map<number, Character>;
}

export type CharacterAction = 
| {type: CharactersActionTypes.NEW, payload: Character[]}
| {type: CharactersActionTypes.CREATE, payload: Character}
| {type: CharactersActionTypes.DELETE, payload: number}
| {type: CharactersActionTypes.EDIT, payload: Character}