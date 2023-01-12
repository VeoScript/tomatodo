export interface TodoDataStatesProps {
  todos: any[]
  setTodos: (data: any) => void
}

export interface ModalStatesProps {
  addTodoModalVisible: boolean
  setAddTodoModalVisible: (value: boolean) => void
}

export interface AddTodoStatesProps {
  task: string
  setTask: (value: string) => void
}