import { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "../context";
import { Character } from "../models";
import { characterService } from "../services";
import { CharacterItem } from "./CharacterItem";
import { useAxios } from "../../shared/hooks/useAxios";
import { CharactersActionTypes } from "../state";

interface Props {
    characters: Character[];
}

export const CharacterList = ({characters}:Props) => {
    const {dispatch} = useContext(CharacterContext);
    const navigate = useNavigate();

    const deleteCharacterServiceCall = useCallback(async (id:number) => {
        characterService.deleteCharacter(id);
    }, []);
    const {error: deleteError, executeFetch: deleteCharacter} = useAxios<number,void>({
        serviceCall: deleteCharacterServiceCall,
        trigger: false
    });
    
    const handleDelete = async (id:number) => {
       deleteCharacter(id);
       if(!deleteError) {
           dispatch({type: CharactersActionTypes.DELETE, payload: id});
       }
    }

    const handleEdit = (character:Character) => {
        dispatch({type: CharactersActionTypes.EDIT, payload: character});
        navigate(`/characters/${character.id}`);
    }

    return (
        <ul>{
            characters.map((character) => (
                <CharacterItem key={character.id} character={character}>
                    <button onClick={() => handleDelete(character.id)}>Delete</button>
                    <button onClick={() => handleEdit(character)}>Edit</button>
                </CharacterItem>
            ))    
        }</ul>
    );
};