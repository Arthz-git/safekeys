import { ReactNode } from 'react'
import { PressableProps } from 'react-native'

interface BouncingButtonProps extends PressableProps {
	children: ReactNode
}

export {
	BouncingButtonProps
}