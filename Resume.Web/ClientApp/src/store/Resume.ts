import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ResumeState {
    isLoading: boolean;
    experiences: Experience[] | undefined;
    education: Education[] | undefined;
}

export interface Experience {
    startDate: string;
    endDate: string;
    title: string;
    company: string;
    description: string;
    type: string;
}

export interface Education {
    startDate: string;
    endDate: string;
    school: string,
    degreeType: string;
    fieldOfStudy: string;
    description: string;
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

interface RequestEducation {
    type: 'REQUEST_EDUCATION';
}

interface ReceiveEducation {
    type: 'RECEIVE_EDUCATION';
    education: Education[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestExperiences |
                   ReceiveExperiences |
                   RequestEducation |
                   ReceiveEducation;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getExperiences: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`resume/GetExperiences`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("There was a problem getting Luciano's experiences.");
                }

                return response.json() as Promise<Experience[]>;
            })
            .then(data => {
                dispatch({ type: 'RECEIVE_EXPERIENCES', experiences: data });
            });

        dispatch({ type: 'REQUEST_EXPERIENCES' });
    },
    getEducation: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`resume/GetEducation`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("There was a problem getting Luciano's education.");
                }

                return response.json() as Promise<Education[]>;
            })
            .then(data => {
                dispatch({ type: 'RECEIVE_EDUCATION', education: data });
            });

        dispatch({ type: 'REQUEST_EDUCATION' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ResumeState = { isLoading: false, experiences: undefined, education: undefined };

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
                ...state,
                isLoading: false,
                experiences: action.experiences
            };

        case 'REQUEST_EDUCATION':
            return {
                ...state,
                isLoading: true
            };

        case 'RECEIVE_EDUCATION':
            return {
                ...state,
                isLoading: false,
                education: action.education
            };

        default:
            return state;
    }
};
