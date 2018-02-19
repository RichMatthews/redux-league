const initialState = [];

export default(state = initialState, action) => {
  switch(action.type){
    case 'MATCHES_FETCH_SUCCEEDED':{
      const matches = [].concat(action.teams)
      return matches;
    }
    default:
      return state;
  }
}
