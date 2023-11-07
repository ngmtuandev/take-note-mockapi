import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
export default function NoteHome() {
    const router = useRoute()
    const {name} = router
    useEffect(() => {
        (async () => {
            try {
              const userData = JSON.parse(await AsynStorage.getItem("user"))
              console.log(userData)
            } catch (error) {
             console.log(error); 
            }
          })()
    }, [])
    return (
        <View>
            <Text>Task yor</Text>
        </View>
    )
}