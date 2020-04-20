import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ResumeState {
    isLoading: boolean;
    experiences: Experience[] | undefined;
    education: Education[] | undefined;
    hardSkills: string[] | undefined;
    softSkills: string[] | undefined;
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
interface RequestResume {
    type: 'REQUEST_RESUME';
}

interface RecieveResume {
    type: 'RECIEVE_RESUME';
}

interface ReceiveExperiences {
    type: 'RECIEVE_EXPERIENCES';
    experiences: Experience[];
}

interface ReceiveEducation {
    type: 'RECIEVE_EDUCATION';
    education: Education[];
}

interface RecieveHardSkills {
    type: 'RECIEVE_HARD_SKILLS';
    hardSkills: string[];
}

interface RecieveSoftSkills {
    type: 'RECIEVE_SOFT_SKILLS';
    softSkills: string[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestResume |
                   RecieveResume |
                   ReceiveExperiences |
                   ReceiveEducation |
                   RecieveHardSkills |
                   RecieveSoftSkills;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getResume: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`resume/GetExperiences`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("There was a problem getting Luciano's experiences.");
                }

                return response.json() as Promise<Experience[]>;
            })
            .then(data => {
                dispatch({ type: 'RECIEVE_EXPERIENCES', experiences: data });
                
                fetch(`resume/GetEducation`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("There was a problem getting Luciano's education.");
                        }
                    
                        return response.json() as Promise<Education[]>;
                    })
                    .then(data => {
                        dispatch({ type: 'RECIEVE_EDUCATION', education: data });
                        
                        fetch(`resume/GetHardSkills`)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("There was a problem getting Luciano's hard skills.");
                                }
                            
                                return response.json() as Promise<string[]>;
                            })
                            .then(data => {
                                dispatch({ type: 'RECIEVE_HARD_SKILLS', hardSkills: data });
                                
                                fetch(`resume/GetSoftSkills`)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error("There was a problem getting Luciano's soft skills.");
                                        }
                                    
                                        return response.json() as Promise<string[]>;
                                    })
                                    .then(data => {
                                        dispatch({ type: 'RECIEVE_SOFT_SKILLS', softSkills: data });

                                        dispatch({ type: 'RECIEVE_RESUME' });
                                    });
                                });
                        });
        });

        dispatch({ type: 'REQUEST_RESUME' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ResumeState = { 
    isLoading: false,
    experiences: undefined,
    education: undefined,
    hardSkills: undefined,
    softSkills: undefined
};

export const reducer: Reducer<ResumeState> = (state: ResumeState | undefined, incomingAction: Action): ResumeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RESUME':
            return {
                ...state,
                isLoading: true
            };

        case 'RECIEVE_RESUME':
            return {
                ...state,
                isLoading: false
            };

        case 'RECIEVE_EXPERIENCES':
            return {
                ...state,
                experiences: action.experiences
            };

        case 'RECIEVE_EDUCATION':
            return {
                ...state,
                education: action.education
            };

        case 'RECIEVE_HARD_SKILLS':
            return {
                ...state,
                hardSkills: action.hardSkills
            };

        case 'RECIEVE_SOFT_SKILLS':
            return {
                ...state,
                softSkills: action.softSkills
            };

        default:
            return state;
    }
};
