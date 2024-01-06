
import * as types from "../actionsTypes/SettingsActionsTypes"

export const changeTheme = () => {
    return {
    type: types.CHANGE_THEME,
    }
}
export const changePreferredColor = (payload) => {
    return{
        type: types.CHANGE_PREFERRED_COLOR,
        payload
    }
}