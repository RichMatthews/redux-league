const initialState = '';

export default(state = initialState, action) => {
  switch(action.type){
    case 'EMPTY_INPUT_ERROR':{
      const matches = [].concat(action.teams)
      return state;
    }
    default:
      return state;
  }
}
