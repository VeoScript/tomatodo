import React from 'react'
import tw from '../styles/tailwind'
import { View, Text, TextInput } from 'react-native'

interface TextBoxProps {
  label?: string
  placeholder?: string
  value: any
  onChangeText: (value: any) => void
}

const TextBox: React.FC<TextBoxProps> = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={tw`flex-1 flex-col w-full my-1`}>
      {label && <Text style={tw`ml-2 mb-2 font-railway-regular text-sm text-neutral-600`}>{ label }</Text>}
      <View style={tw`flex-1 flex-row items-center w-full px-3 rounded-xl border border-purple bg-white`}>
        <TextInput
          style={tw`w-full font-railway-regular text-base text-neutral-600`}
          placeholderTextColor="#838383"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  )
}

export default TextBox