import { UPDATE_FILTER, APPLY_FILTERS } from "../constants/actionTypes";

export const updateFilter = (filter) => async (dispatch) => {
    
    try {
        dispatch({
            type: UPDATE_FILTER,
            payload: {
                filterName: filter.filterName,
                filterValue: filter.filterValue
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const applyFilters = () => async (dispatch) => {

    try {
        dispatch({
            type: APPLY_FILTERS,
        });
    } catch (error) {
        console.log(error.message);
    }
};