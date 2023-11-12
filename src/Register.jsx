import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
export default function Register() {
  const navigation = useNavigation();
  const [dataRegister, setDataRegister] = useState({
    name: "",
    user_name: "",
    pass: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const handleRegister = async () => {
    // console.log(dataRegister)
    try {
      const respone = await fetch(
        "https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataRegister),
        }
      );
      if (+respone?.status === 201) {
        setIsRegister(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: "30px", color: "red" }}>
        Register Noww
      </Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <TextInput
            onChangeText={(value) =>
              setDataRegister({ ...dataRegister, name: value })
            }
            style={{
              width: "300px",
              marginTop: "30px",
              paddingLeft: "5px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "gray",
              height: "45px",
              paddingLeft: "15px",
            }}
            placeholder="your name"
          ></TextInput>
        </View>
        <View>
          <TextInput
            onChangeText={(value) =>
              setDataRegister({ ...dataRegister, user_name: value })
            }
            style={{
              width: "300px",
              marginTop: "30px",
              paddingLeft: "5px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "gray",
              height: "45px",
              paddingLeft: "15px",
            }}
            placeholder="user name"
          ></TextInput>
        </View>
        <View>
          <TextInput
            onChangeText={(value) =>
              setDataRegister({ ...dataRegister, pass: value })
            }
            style={{
              width: "300px",
              marginTop: "30px",
              paddingLeft: "5px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "gray",
              height: "45px",
              paddingLeft: "15px",
            }}
            placeholder="password"
          ></TextInput>
        </View>
      </View>
      <View>{isRegister && <Text>Create account user success</Text>}</View>
      <View style={{ flexDirection: "row", marginTop: "30px" }}>
        <View>
          <TouchableOpacity
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              borderRadius: "20px",
              alignItems: "center",
              marginRight: "10px",
            }}
            onPress={handleRegister}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              borderRadius: "20px",
              alignItems: "center",
              marginLeft: "10px",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
