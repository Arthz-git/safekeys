import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const HEIGHT = Dimensions.get('window').height

export function normalize(size: number) {
	return RFValue(size, HEIGHT)
}