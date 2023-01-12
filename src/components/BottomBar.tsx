import React from 'react'
import tw from '../styles/tailwind'
import { OcticonsIcons } from '../utils/Icons'
import { modalStore } from '../zustand/store'
import { View, TouchableOpacity, Keyboard } from 'react-native'

const BottomBar = () => {

  const { setAddTodoModalVisible } = modalStore((state) => state)

  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState<boolean>(false)

  // check if the keyboard is visible
  React.useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true)
    })
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false)
    })
    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  return (
    <>
      {!keyboardIsVisible && (
        <View style={tw`relative flex-row justify-center w-full px-10`}>
          <View style={tw`absolute bottom-1 flex-row items-center justify-between w-full px-8 py-1 rounded-[2rem] shadow-2xl shadow-neutral-900 border border-neutral-100 bg-white`}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`flex-row items-center justify-center w-[3.3rem] h-[3.3rem] rounded-full`}
              onPress={() => console.log('Go to home screen')}
            >
              <OcticonsIcons size={30} name="home" color="#617cf2" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`flex-row items-center justify-center w-[4rem] h-[4rem] -mt-10 rounded-full shadow-lg bg-purple`}
              onPress={() => setAddTodoModalVisible(true)}
            >
              <OcticonsIcons size={40} name="plus" color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`flex-row items-center justify-center w-[3.3rem] h-[3.3rem] rounded-full`}
              onPress={() => console.log('Go to home screen')}
            >
              <OcticonsIcons size={30} name="gear" color="#8b939f" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default BottomBar