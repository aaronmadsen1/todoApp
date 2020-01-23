import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"

import Header from "./components/header"
import TodoItem from "./components/todoItem"
import AddTodo from "./components/addTodo"
import Sandbox from "./components/sandbox"

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play a game", key: "3" }
  ])

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = text => {
    Keyboard.dismiss()
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodos]
      })
    } else {
      Alert.alert("OOPS!", "todos must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ])
    }
  }

  return (
    // <Sandbox />

    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
        console.log("dismissed keyboard")
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 40,
    // backgroundColor: "#999",
    flex: 1
  },
  list: {
    marginTop: 20,
    // backgroundColor: "#888",
    flex: 1
  }
})

// React Native Tutorial #9 - Todo App (part 1)         https://www.youtube.com/watch?v=uLHFPt9B2Os&t=3s
// React Native Tutorial #10 - Todo App (part 2)        https://www.youtube.com/watch?v=SGEitne8N-Q
// React Native Tutorial #11 - Todo App (part 3)        https://www.youtube.com/watch?v=LH_SoXiu_Hk
// React Native Tutorial #12 - Alerts                   https://www.youtube.com/watch?v=oVA9JgTTiT0&t=4s
// React Native Tutorial #13 - Dismissing the Keyboard  https://www.youtube.com/watch?v=IW-SEiRjUsI
// React Native Tutorial #14 - Flexbox Basics           https://www.youtube.com/watch?v=R2eqAgR_KlU
