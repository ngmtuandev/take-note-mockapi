import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NoteWithRedux = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const [priority, setPriority] = useState("");
  const [render, setRender] = useState(false);

  const addTask = () => {
    setRender(!render);
    dispatch({
      type: "add",
      payload: task,
    });
  };
  console.log(tasks);

  return (
    <View
      style={{
        marginTop: "30px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text>{`Task your:`}</Text>
          <TextInput
            style={{
              borderWidth: "2px",
              height: "35px",
              width: "350px",
              marginTop: "10px",
              marginBottom: "20px",
              borderRadius: "20px",
              paddingLeft: "8px",
            }}
            value={task}
            onChangeText={(value) => setTask(value)}
          ></TextInput>
        </View>
        <View>
          <Text>{`Priority(1: very, 2: medium, 3: normal)):`}</Text>
          <TextInput
            style={{
              borderWidth: "2px",
              height: "35px",
              width: "350px",
              marginTop: "10px",
              marginBottom: "20px",
              paddingLeft: "8px",
              borderRadius: "20px",
            }}
            value={priority}
            onChangeText={(value) => setPriority(value)}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => addTask()}
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "20px",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <View>
        {tasks.map((el) => {
          return (
            <TouchableOpacity
              onPress={() =>
                dispatch({
                  type: "delete",
                  payload: el,
                })
              }
            >
              <View
                style={{
                  width: "300px",
                  height: "50px",
                  backgroundColor: "red",
                  borderRadius: "10px",
                  paddingLeft: "10px",
                  marginTop: "10px",
                }}
              >
                <Text style={{ color: "white" }}>{el}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default NoteWithRedux;
