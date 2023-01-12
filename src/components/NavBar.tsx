import React from 'react'
import tw from '../styles/tailwind'
import { FeatherIcons } from '../utils/Icons'
import { View, Text, TouchableOpacity } from 'react-native'

const NavBar = () => {
  return (
    <View style={tw`flex-row items-center justify-between w-full p-3`}>
      <View style={tw`flex-1 flex-row justify-start mr-1`}>
        <Text style={tw`font-railway-regular text-lg text-neutral-800`}>Hello, Jerome!✌️</Text>
      </View>
      <View style={tw`flex-1 flex-row justify-end ml-1`}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`btn-icon`}
          onPress={() => console.log('You press menu')}
        >
          <FeatherIcons size={25} name="menu" color="#1c2548" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NavBar