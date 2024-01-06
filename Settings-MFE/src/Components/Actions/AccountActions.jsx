

export const changeTheme = () => {
    return {
    type: "CHANGE_THEME"
    }
}

export const changePreferredColor = (payload) => {
    return{
        type:"CHANGE_PREFERRED_COLOR",
        payload
    }
}