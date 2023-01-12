import React from 'react'
import FeatherCons from 'react-native-vector-icons/Feather'
import OctiCons from 'react-native-vector-icons/Octicons'

FeatherCons.loadFont()
OctiCons.loadFont()

export interface IconProps {
  size: number;
  name: string;
  color: string;
}

export const FeatherIcons = ({size, name, color}: IconProps) => (
  <FeatherCons name={name} size={size} color={color} />
)

export const OcticonsIcons = ({size, name, color}: IconProps) => (
  <OctiCons name={name} size={size} color={color} />
)
