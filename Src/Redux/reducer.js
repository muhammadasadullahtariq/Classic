function reducer(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        },
      ]; // add new todo
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id); // remove todo
    default:
      // return state if no action  is matched or if action is not defined (for example, if action is undefined) or if action is not a string (for example, if action is null)
      return state;
  }
}

export default reducer;
