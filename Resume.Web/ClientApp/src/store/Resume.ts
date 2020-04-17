import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ResumeState {
    isLoading: boolean;
    experiences: Experience[] | undefined;
}

export interface Experience {
    startDate: string;
    endDate: string;
    title: string;
    company: string;
    description: string;
    type: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface RequestExperiences {
    type: 'REQUEST_EXPERIENCES';
}

interface ReceiveExperiences {
    type: 'RECEIVE_EXPERIENCES';
    experiences: Experience[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestExperiences | ReceiveExperiences;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getExperiences: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`resume/GetExperiences`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("There was a problem getting my personal info.");
                }

                return response.json() as Promise<Experience[]>;
            })
            .then(data => {
                console.log(data);
                dispatch({ type: 'RECEIVE_EXPERIENCES', experiences: data });
            });

        dispatch({ type: 'REQUEST_EXPERIENCES' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ResumeState = { isLoading: false, experiences: undefined };

export const reducer: Reducer<ResumeState> = (state: ResumeState | undefined, incomingAction: Action): ResumeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_EXPERIENCES':
            return {
                ...state,
                isLoading: true
            };

        case 'RECEIVE_EXPERIENCES':
            return {
                isLoading: false,
                experiences: action.experiences
            };

        default:
            return state;
    }
};
