import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface HomeState {
    isLoading: boolean;
    aboutMe: AboutMe | undefined;
}

export interface AboutMe {

}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface RequestAboutMe {
    type: 'REQUEST_ABOUT_ME';
}

interface ReceiveAboutMe {
    type: 'RECEIVE_ABOUT_ME';
    aboutMe: AboutMe;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestAboutMe | ReceiveAboutMe;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getAboutMe: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        fetch(`home/GetAboutMe`)
            .then(response => response.json() as Promise<AboutMe>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ABOUT_ME', aboutMe: data });
            });

        dispatch({ type: 'REQUEST_ABOUT_ME' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: HomeState = { aboutMe: undefined, isLoading: false };

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ABOUT_ME':
            return {
                ...state,
                isLoading: true
            };

        case 'RECEIVE_ABOUT_ME':
            return {
                aboutMe: action.aboutMe,
                isLoading: false
            };

        default:
            return state;
    }
};
