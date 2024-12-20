export interface ModalState {
    isModalOpen: boolean;
}

enum ModalActionType {
    OPEN_CLOSE = 'OPEN_CLOSE',
}

export type ModalAction = { type: ModalActionType.OPEN_CLOSE, payload: boolean };