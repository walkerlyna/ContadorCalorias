import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState: ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
    state: ActivityState,
    action: ActivityActions
) => {
    switch (action.type) {
        case 'save-activity':

            return {
                ...state,
                activities: state.activeId
                    ? state.activities.map(activity =>
                        activity.id === state.activeId ? action.payload.newActivity : activity
                    )
                    : [...state.activities, action.payload.newActivity],
                activeId: ''
            }

        case 'set-activeId':
            return {
                ...state,
                activeId: action.payload.id
            }

        case 'delete-activity':
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            }

        case 'restart-app':
            return {
                activities: [],
                activeId: ''
            }
        default:
            return state
    }
}