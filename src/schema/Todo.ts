export const TodoSchema = {
  name: 'Todo',
  properties: {
    task: 'string',
    isCompleted: {type: 'bool', default: false},
  },
}