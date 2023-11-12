import { View, Text } from "react-native";

export default function ShowErr({ text }) {
  return (
    <View>
      <Text style={{ color: "red" }}>{text}</Text>
    </View>
  );
}
