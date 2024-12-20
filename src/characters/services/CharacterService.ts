import axios from "axios";
import { Character } from "../models";

class CharacterService {
    private BASE_URL = 'http://localhost:4000/characters';

    async getCharacters(): Promise<Character[]> {
        const response = await axios.get<Character[]>(this.BASE_URL);
        return response.data;
    }

    async deleteCharacter(id: number): Promise<Character> {
        const response = await axios.delete(`${this.BASE_URL}/${id}`);
        return response.data;
    }

    async editCharacter(character: Character): Promise<Character> {
        const response = await axios.put<Character>(`${this.BASE_URL}/${character.id}`, character);
        return response.data;
    }

    async createCharacter(character: Omit<Character,'id'>): Promise<Character> {
        const response = await axios.post<Character>(this.BASE_URL, character);
        return response.data;
    }
}

export const characterService = new CharacterService();