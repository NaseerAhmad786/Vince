import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert,TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/OpenAi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [animation, setAnimation] = useState(false);
  const scrollViewRef = useRef();
  const fetchResponse = async () => {
   
    if (textInputValue.trim().length > 0) {
       
      setAnimation(true);
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: textInputValue.trim() });
      setMessages(newMessages);
    
      upDateScrollView();
  
      await apiCall(textInputValue.trim(), newMessages)
        .then(res => {
          if (res.success) {
            setMessages(res.data);
            upDateScrollView();
            setAnimation(false)
            setTextInputValue('');
          } else {
            Alert.alert('Error', res.msg);
          }
        })
        .catch(error => {
          console.log('API error:', error);
          Alert.alert('Error', 'Failed to fetch response from the API.');
        })
    }
  };
  const L = ()=>{
    setAnimation(true);
    fetchResponse()
  }
const upDateScrollView=()=>{
  setTimeout(()=>{
    scrollViewRef?.current?.scrollToEnd({animated:true})
  },2000)
}
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 flex mx-5">
        {/* {bot icon} */}
        <View className="flex-row justify-center">
          <Image source={require("../Assets/Virtual.png")} style={{ height: hp(20), width: hp(20) }} />
        </View>
        {/* features or messages */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1  mt-18">
            <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
              Assistant
            </Text>
            <View style={{ height: hp(50) }} className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView bounces={false} className="space-y-4" showsVerticalScrollIndicator={false}>
                {messages.map((massage, index) => {
                  if (massage.role === "assistant") {
                   
                    if (massage.content.includes("https")) {
                      // its an image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 flex-rounded-2xl bg-emerald-100 rounded-tl-none">
                            <Image
                              source={{ uri: massage.content }}
                              className="rounded-2xl"
                              resizeMode='contain'
                              style={{ height: wp(50), width: wp(50) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                         
                        <View
                          key={index}
                          style={{ width: wp(70) }}
                          className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                        >
                           <Text>
                            {massage.content}
                          </Text>
                        </View>
                      );
                    }
                  } 
                 
                  
                  else {
                    // user Input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white rounded-xl p-2 rounded-tr-none"
                        >
                          <Text>
                            {massage.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }


                })}


                    {animation ?    <View
                
                          style={{ width: wp(70) }}
                          className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                        >
<Lottie
                
                source={require("../Assets/animation.json")}
                autoPlay
                loop
                style={{ width: wp(10), height:wp(10) }}
              />
                        </View> 
: null
                  }
             
              
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        {/* text input and send button */}
        <View className="flex-row  items-center mt-10 justify-end">
          <TextInput
            placeholder="Type your message..."
            value={textInputValue}
         
            onChangeText={setTextInputValue}
            style={{
            
              width: '80%',
              
             
            }}
            className=" pl-4  rounded-2xl bg-slate-300"
          />
          <TouchableOpacity onPress={()=>L()} className="rounded-full p-2  ml-2 justify-center items-center">
            <Icon name={"send"} size={25}  color={textInputValue.length>0 ?"#1388cd" :"#A3A4A8" } />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});