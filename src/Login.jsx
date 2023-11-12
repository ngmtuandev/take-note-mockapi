import { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Modal,
} from "react-native";
import ShowErr from "./ShowErr";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const [dataUsers, setDataUsers] = useState([]);
  const [login, setLogin] = useState({
    user_name: "",
    pass: "",
  });
  const [showErr, setShowErr] = useState(false);
  useEffect(() => {
    (async () => {
      const users = await fetch(
        "https://6549d5a1e182221f8d51f431.mockapi.io/take-note/api/user",
        {
          method: "get",
        }
      );
      const data = await users?.json();
      if (data) {
        setDataUsers(data);
      }
    })();
  }, []);

  const handleLogin = async () => {
    if (!dataUsers?.find((item) => item?.user_name === login.user_name)) {
      setTimeout(() => {
        setShowErr(true);
      }, 1000);
      setShowErr(false);
      return;
    }
    if (!dataUsers?.find((item) => item?.pass === login.pass)) {
      setTimeout(() => {
        setShowErr(true);
      }, 1000);
      setShowErr(false);
      return;
    }
    try {
      const dataUserLogin = dataUsers?.find(
        (el) => el.user_name === login.user_name
      );
      // console.log("dataUserLogin : ", dataUserLogin);
      await AsyncStorage.setItem("user", JSON.stringify(dataUserLogin));
      navigation.navigate("Notehome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <View>
        <View>
          <TextInput
            onChangeText={(value) => setLogin({ ...login, user_name: value })}
            style={{
              width: "300px",
              marginTop: "30px",
              paddingLeft: "5px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "gray",
              height: "45px",
            }}
            placeholder="user name"
          ></TextInput>
        </View>
        <View>
          <TextInput
            onChangeText={(value) => setLogin({ ...login, pass: value })}
            style={{
              width: "300px",
              marginTop: "30px",
              paddingLeft: "5px",
              borderRadius: "10px",
              borderWidth: "1px",
              borderColor: "gray",
              height: "45px",
            }}
            placeholder="password"
          ></TextInput>
        </View>
      </View>
      {showErr && <ShowErr text={"Info your not exit"}></ShowErr>}
      <View>
        <TouchableOpacity onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
