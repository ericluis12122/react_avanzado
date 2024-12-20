import { ReactNode } from "react";
import { Character } from "../models";

interface Props {
    character: Character;
    children: ReactNode;
}

export const CharacterItem = ({character, children}: Props) => {
    return (
        <li>
            {character.name}
            {children}
        </li>
    );
};