const INITIAL_STATE = {
  selectedVehicle: null,
  selectedCompany: null,
  source: []
};

function reducer(state = INITIAL_STATE, action) {

  switch (action.type) {

    case 'SET_COMPANIES':
      return { ...state, source: action.source };

    case 'SELECT_VEHICLE':
      return { ...state, selectedVehicle: action.selectedVehicle };

    case 'SELECT_COMPANY':
      return { ...state, selectedCompany: action.selectedCompany };

    default:
      return state;
  }
}

export default reducer;