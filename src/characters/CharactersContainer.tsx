import { useCallback, useContext, useEffect } from "react";
import { useAxios } from "../shared/hooks/useAxios";
import { Character } from "./models";
import { CharacterList } from "./components/CharacterList";
import { characterService } from "./services";
import { ModalContext } from "../shared/components/modal/context/ModalContext";
import { Modal } from "../shared/components/modal/Modal";
import { CharacterForm } from "./components";
import { CharacterContext } from "./context";
import { CharactersActionTypes } from "./state";

export const CharactersContainer = () => {
    const serviceCall = useCallback(() => characterService.getCharacters(), []);
    const {setState} = useContext(ModalContext);
    const {state, dispatch} = useContext(CharacterContext);

    const {isLoading, data: characters, error} = useAxios<void, Character[]>({
        serviceCall,
        trigger: true
    });

    const openModal = () => {
        setState(true);
    };

    useEffect(() => {
        if(characters && characters.length > 0) {
            dispatch({type: CharactersActionTypes.NEW, payload: characters});
        }
    }, [characters, dispatch]);

    if(isLoading) return <p>Loading character...</p>;
    
    if(error) return <p>Error: {error}</p>;

    return (
        <>
            {state && state.characters.size > 0 ? 
                <CharacterList characters={Array.from(state.characters, (([,value]) => value))}>
                </CharacterList>
                : <div>Empty</div>
            }
            <button onClick={openModal}>Create Character</button>
            <Modal><CharacterForm/></Modal>
        </> 
    );
}