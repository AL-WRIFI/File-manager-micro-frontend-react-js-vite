
const initialState = {
    filterName:["AllFiles"],
}


const FilterReducer = ( state=initialState,action) =>{
    switch(action.type){
        case "ADD_FILTER_NAME":
        return{
            ...state,
            filterName : action.payload,
        };
        case "CLEAR_FILTER_NAME":
        return{
            ...state,
        };
        
       default: return state;
    }
};

export default FilterReducer;