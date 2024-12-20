import { z } from "zod";
import { Gender, Status } from "../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CharacterContext } from "../context";
import { CharactersActionTypes } from "../state";
import { characterService } from "../services";
import { FormInput } from "../../shared/components";
import { ModalContext } from "../../shared/components/modal/context/ModalContext";

const characterSchema = z.object({
    id: z.number().default(-1),
    name: z.string().min(1, 'Name is required'),
    status: z.nativeEnum(Status, {errorMap: () => ({message: 'Invalid status'})}),
    species: z.string().min(1, 'Species is required'),
    type: z.string(),
    gender: z.nativeEnum(Gender, {errorMap: () => ({message: 'Invalid gender'})}),
    origin: z.object({
        name: z.string().min(1, 'Origin name is required'),
        url: z.string().url('Invalid origin URL'),
    }),
    location: z.object({
        name: z.string().min(1, 'Location name is required'),
        url: z.string().url('Invalid location URL'),
    }),
    image: z.string().url('Invalid image URL'),
    episode: z.preprocess(
        (input) => {
          if (input === "" || input === null) return undefined; // Tratar cadenas vacías o null como ausentes
          return input;
        },
        z.array(z.string().url('Invalid episode URL')).optional().default([]),
      ),
      
    url: z.string().url('Invalid character URL'),
    created: z.string()
});

type CharacterFormData = z.infer<typeof characterSchema>;

export const CharacterForm = () => {
    const {register, handleSubmit, formState, reset} = useForm<CharacterFormData>({
        resolver: zodResolver(characterSchema),
    });

    const {id} = useParams();
    const {state, dispatch} = useContext(CharacterContext);
    const {setState: setModalState} = useContext(ModalContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (id) {
            const character = state.characters.get(Number(id));
            if (character) {
                reset(character);
            }
        }
    }, [id, state.characters, reset]);

    const onSubmit = async (data: CharacterFormData) => {
        try {
            const actionType = id ? CharactersActionTypes.EDIT : CharactersActionTypes.CREATE;
            let result = null;
            if (id) {
                result = await characterService.editCharacter(data);
            } else {
                result = await characterService.createCharacter(data);
            }
            dispatch({type: actionType, payload: result});
            setModalState(false);
            navigate('/characters');
        } catch (error) {
            if(error instanceof Error) {
                alert(error.message || 'Error creating/editing a character');
            }
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Edit' : 'Create'} Character</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label="Name" register={register('name')} error={formState.errors.name?.message} />
                <FormInput label="Status" register={register('status')} error={formState.errors.status?.message} />
                <FormInput label="Species" register={register('species')} error={formState.errors.species?.message} />
                <FormInput label="Type" register={register('type')} error={formState.errors.type?.message} />
                <FormInput label="Gender" register={register('gender')} error={formState.errors.gender?.message} />
                <FormInput label="Origin Name" register={register('origin.name')} error={formState.errors.origin?.name?.message} />
                <FormInput label="Origin URL" register={register('origin.url')} error={formState.errors.origin?.url?.message} />
                <FormInput label="Location Name" register={register('location.name')} error={formState.errors.location?.name?.message} />
                <FormInput label="Location URL" register={register('location.url')} error={formState.errors.location?.url?.message} />
                <FormInput label="Image" register={register('image')} error={formState.errors.image?.message} />
                <FormInput label="Episode" register={register('episode')} error={formState.errors.episode?.message} />
                <FormInput label="URL" register={register('url')} error={formState.errors.url?.message} />
                <FormInput label="Created" register={register('created')} error={formState.errors.created?.message} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
        
};

