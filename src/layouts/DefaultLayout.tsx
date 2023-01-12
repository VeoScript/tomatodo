import React from 'react'
import BottomBar from '../components/BottomBar'
import tw from '../styles/tailwind'
import { SafeAreaView, View } from 'react-native'

interface IProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-ghost-white`}>
      <View style={tw`flex-1 flex-col items-start justify-between w-full`}>
        <View style={tw`flex-1 flex-col w-full`}>
          {children}
        </View>
        <BottomBar />
      </View>
    </SafeAreaView>
  )
}

export default DefaultLayout