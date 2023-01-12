import React from 'react'
import Realm from 'realm'
import NavBar from '../components/NavBar'
import DefaultLayout from '../layouts/DefaultLayout'
import ModalBody from '../components/ModalBody'
import TextBox from '../components/TextBox'
import tw from '../styles/tailwind'
import { FeatherIcons } from '../utils/Icons'
import { TodoSchema } from '../schema/Todo'
import { todoStore, modalStore, addTodoStore } from '../zustand/store'
import { FlatList, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

interface TodoCardProps {
  index: number
  todo: {
    task: string
    isCompleted: boolean
  }
}

const HomeScreen = () => {

  const { todos, setTodos } = todoStore((state) => state)

  React.useEffect(() => {
    Realm.open({ schema: [TodoSchema] }).then(realm => {
      realm.write(() => {
        const allTodos = realm.objects('Todo')
        setTodos(allTodos)
      })
    })
  }, [])

  const getPendingTasks = todos.filter((task: { isCompleted: boolean }) => task.isCompleted === false)

  return (
    <DefaultLayout>
      <FlatList
        style={tw`flex-1 w-full px-3`}
        data={todos}
        ListHeaderComponent={() => (
          <>
            <NavBar />
            {todos.length > 0 && (
              <View style={tw`flex-col w-full mt-2 mb-4`}>
                <Text style={tw`font-railway-black text-center text-2xl text-dark-purple`}>You've got { todos.length } tasks today</Text>
              </View>
            )}
            <View style={tw`search-body`}>
              <FeatherIcons size={20} name="search" color="#8b939f" />
              <TextInput
                style={tw`search-input`}
                placeholderTextColor="#838383"
                placeholder="Search task..."
              />
            </View>
            <View style={tw`flex-row items-center w-full my-2 p-5 rounded-xl shadow-md bg-purple`}>
              <View style={tw`flex-1 flex-col items-start w-full -mt-2`}>
                <Text style={tw`my-0.5 font-railway-bold text-lg text-white`}>Project time tracker</Text>
                <Text style={tw`my-0.5 font-railway-regular text-sm text-white`}>You can start tracking</Text>
              </View>
              <View style={tw`flex-1 flex-col items-end w-full -mt-2`}>
                <Text style={tw`font-railway-bold text-[2rem] text-dark-purple`}>{ getPendingTasks.length }</Text>
                <Text style={tw`font-railway-regular text-sm text-white`}>Pending Tasks</Text>
              </View>
            </View>
            <View style={tw`flex-col w-full my-2`}>
              <View style={tw`flex-row items-center justify-between w-full`}>
                <Text style={tw`ml-2 font-railway-black text-lg text-dark-purple`}>Today's tasks</Text>
                {todos.length > 0 && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      Alert.alert(
                        '',
                        'Are you sure you want to clear all of you tasks?',
                        [
                          {
                            text: 'Cancel',
                            style: "cancel"
                          },
                          {
                            text: 'Clear All',
                            style: "default",
                            onPress: () => {
                              Realm.open({ schema: [TodoSchema] }).then(realm => {
                                realm.write(() => {
                                  realm.delete(todos)
                                  const allTodos = realm.objects('Todo')
                                  setTodos(allTodos)
                                })
                              })
                            }
                          }
                        ],
                        {
                          cancelable: true
                        }
                      )
                    }}
                  >
                    <Text style={tw`ml-2 font-railway-regular text-sm text-neutral-600`}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 flex-col items-center w-full my-10`}>
            <FeatherIcons size={75} name="feather" color="#617cf2" />
            <Text style={tw`mt-3 font-railway-bold text-lg text-purple`}>You don't have a task now, do a new one</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={tw`mb-22`} />
        )}
        renderItem={({item, index}) => (
          <TodoCard index={index} todo={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <AddTodoModal />
    </DefaultLayout>
  )
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, index }) => {

  const { todos, setTodos } = todoStore((state) => state)

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`flex-row items-start justify-between w-full my-1 p-5 rounded-xl shadow-md bg-white`}
      onPress={() => {
        Realm.open({ schema: [TodoSchema] }).then(realm => {
          realm.write(() => {
            todos[index].isCompleted = !todos[index].isCompleted
          })
          setTodos([...todos])
        })
      }}
    >
      <View style={tw`relative flex-1 flex-row items-center w-full`}>
        {todo.isCompleted
          ? <FeatherIcons size={20} name="check-square" color="#617cf2" />
          : <FeatherIcons size={20} name="square" color="#bdbdbd" />
        }
        <View style={tw`flex-1 mt-1 mx-2`}>
          {todo.isCompleted && <View style={tw`absolute top-1/2 w-full border border-purple`} />}
          <Text style={tw`-mt-1 ml-3 mr-5 font-railway-bold text-base text-dark-purple`}>{ todo.task }</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          Realm.open({ schema: [TodoSchema] }).then(realm => {
            realm.write(() => {
              const todoToDelete: any = realm.objects('Todo').find((dbTodo: any) => dbTodo.task === todo.task)
              realm.delete(todoToDelete)
              const allTodos = realm.objects('Todo')
              setTodos(allTodos)
            })
          })
        }}
      >
        <FeatherIcons size={18} name="trash" color="#ec4e51" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const AddTodoModal = () => {

  const { addTodoModalVisible, setAddTodoModalVisible } = modalStore((state) => state)

  const { setTodos } = todoStore((state) => state)
  const { task, setTask } = addTodoStore((state) => state)

  const addTodo = () => {
    Realm.open({ schema: [TodoSchema] }).then(realm => {
      realm.write(() => {
        realm.create('Todo', { task: task })
        const allTodos = realm.objects('Todo')
        setTodos(allTodos)
        clearAll()
      })
    })
  }

  const clearAll = () => {
    setTask('')
    setAddTodoModalVisible(false)
  }

  return (
    <ModalBody modalVisible={addTodoModalVisible} setModalVisible={clearAll}>
      <View style={tw`flex-col items-center justify-center w-full p-5 rounded-xl overflow-hidden bg-white`}>
        <View style={tw`flex-row items-center justify-between w-full`}>
          <View style={tw`flex-1 flex-row items-center`}>
            <Text style={tw`font-railway-bold text-base text-dark-purple`}>New Task</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              clearAll()
              setAddTodoModalVisible(false)
            }}
          >
            <FeatherIcons size={18} name="x" color="#acacac" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-col w-full my-3`}>
          <TextBox
            label="Name of task"
            value={task}
            onChangeText={(value: string) => setTask(value)}
          />
          <TouchableOpacity
            disabled={task === ''}
            activeOpacity={0.8}
            style={tw`${task === '' ? 'btn-primary-disabled' : 'btn-primary'}`}
            onPress={addTodo}
          >
            <Text style={tw`font-railway-regular text-base text-white`}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalBody>
  )
}

export default HomeScreen
