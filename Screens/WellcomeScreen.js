import { Image, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const App = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white" >
      <View className="space-y-2">
        <Text style={{fontSize:wp(7)}} className="text-center text-4xl font-bold text-gray-700">
          Vince
        </Text>
        <Text style={{fontSize:wp(5)}} className="text-center track-wider text-gray-600 font-semibold"  >Future is Here,Power by AI</Text>
      </View>
      <View className="flex-row justify-center" >
        <Image source={require("../Assets/Virtual.png")} style={{height:hp(60),width:wp(60)}} />

      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}className="bg-sky-400 mx-5 p-4 rounded-2xl">
        <Text className="text-center font-bold text-white text-2xl">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})