import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export default function Register() {
    const navigation = useNavigation()
    const [dataRegister, setDataRegister] = useState({
        name: "",
        user_name: "",
        pass: ""
      })
    const [isRegister, setIsRegister] = useState(false)
    const handleRegister = async () => {
        // console.log(dataRegister)
        try {
            const respone = await fetch('https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dataRegister),
            })
            if (+respone?.status === 201)
            {
                setIsRegister(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <View style={{width: screen, height: screen, flex: 1, backgroundColor: 'rgba(241, 203, 101, 1)'}}>
            <Text>Register</Text>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View>
                    <TextInput 
                    onChangeText={(value) => setDataRegister({...dataRegister, name: value})}
                    style={{width: '300px', marginTop: '30px' ,paddingLeft: '5px', borderRadius: '10px' ,borderWidth: '1px', borderColor: 'gray', height: '45px'}} placeholder='your name'></TextInput>
                </View>
                <View>
                    <TextInput 
                    onChangeText={(value) => setDataRegister({...dataRegister, user_name: value})}
                    style={{width: '300px', marginTop: '30px' ,paddingLeft: '5px', borderRadius: '10px' ,borderWidth: '1px', borderColor: 'gray', height: '45px'}} placeholder='user name'></TextInput>
                </View>
                <View>
                    <TextInput 
                    onChangeText={(value) => setDataRegister({...dataRegister, pass: value})}
                    style={{width: '300px', marginTop: '30px' ,paddingLeft: '5px', borderRadius: '10px' ,borderWidth: '1px', borderColor: 'gray', height: '45px'}} placeholder='password'></TextInput>
                </View>
            </View>
            <View>
                {
                    isRegister && <Text>Create account user success</Text>
                }
            </View>
            <View>
                <View>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}