import React from 'react'
import tw from '../styles/tailwind'
import { Modal, StatusBar, Pressable, View } from 'react-native'

interface ModalBodyProps {
  children: React.ReactNode
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <StatusBar
        animated={false}
        backgroundColor={'#96adec'}
        barStyle={'light-content'}
      />
      <Pressable
        style={tw`absolute inset-0 w-full h-full bg-[#96adec] bg-opacity-70`}
        disabled={false}
        onPress={() => {
          setModalVisible(false)
        }}
      />
      <View style={tw`absolute top-1/2 -mt-[10rem] w-full px-5`}>{ children }</View>
    </Modal>
  )
}

export default ModalBody