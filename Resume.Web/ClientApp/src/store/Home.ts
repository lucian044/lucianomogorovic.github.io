import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HomeState {
    isLoading: boolean;
    personalInfo: PersonalInfo | undefined;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    description: string;
    title: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    website: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface RequestPersonalInfo {
    type: 'REQUEST_PERSONAL_INFO';
}

interface ReceivePersonalInfo {
    type: 'RECEIVE_PERSONAL_INFO';
    personalInfo: PersonalInfo;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestPersonalInfo | ReceivePersonalInfo;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getPersonalInfo: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`home/GetPersonalInfo`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("There was a problem getting my personal info.");
                }

                return response.json() as Promise<PersonalInfo>;
            })
            .then(data => {
                dispatch({ type: 'RECEIVE_PERSONAL_INFO', personalInfo: data });
            });

        dispatch({ type: 'REQUEST_PERSONAL_INFO' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HomeState = { personalInfo: undefined, isLoading: false };

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PERSONAL_INFO':
            return {
                ...state,
                isLoading: true
            };

        case 'RECEIVE_PERSONAL_INFO':
            return {
                personalInfo: action.personalInfo,
                isLoading: false
            };

        default:
            return state;
    }
};
