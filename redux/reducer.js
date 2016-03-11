var assign = require('object-assign');

function getId(state) {
  return state.todos.reduce((maxId, todo) => {
    return Math.max(todo.id, maxId)
  }, -1) + 1
}

let reducer = function(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return assign({}, state, {
        todos: [{
          text: action.text,
          completed: false,
          id: getId(state)
        }, ...state.todos]
      })
    case 'COMPLETE_TODO':
      return assign({}, state, {
        todos: state.todos.map((todo) => {
          return todo.id === action.id ?
            assign({}, todo, {completed: !todo.completed}) : todo
        })
      })
    case 'DELETE_TODO':
      return assign({}, state, {
        todos: state.todos.filter((todo) => {
          return todo.id !== action.id
        })
      })
    default:
      return state;
  }
}

export default reducer
