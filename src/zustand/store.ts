import { create } from 'zustand'
import { TodoDataStatesProps, ModalStatesProps, AddTodoStatesProps } from './types'

export const todoStore = create<TodoDataStatesProps>(set => ({
  todos: [],
  setTodos: (data: any) => set(() => ({ todos: data }))
}))

export const modalStore = create<ModalStatesProps>(set => ({
  addTodoModalVisible: false,
  setAddTodoModalVisible: (value: boolean) => set(() => ({ addTodoModalVisible: value }))
}))

export const addTodoStore = create<AddTodoStatesProps>(set => ({
  task: '',
  setTask: (value: string) => set(() => ({ task: value }))
}))
