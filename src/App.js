import React, { useState, useEffect } from "react";
import "./App.css";
import { a, Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { listTodos } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";

Amplify.configure(config);

function App() {
  const [acPower, setacPower] = useState([]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateTodo)
    ).subscribe({
      next: (data) => {
        const {
          value: {
            data: { onCreateTodo },
          },
        } = data;
        const acData = [...acPower, onCreateTodo];
        setacPower(acData);
      },
    });
    return () => subscription.unsubscribe();
  }, [acPower]);

  // const fetchACPower = async () => {
  //   const apiData = await API.graphql({
  //     query: listTodos,
  //   });
  //   setacPower(apiData.data.listTodos.items);
  // };

  console.log(acPower);

  return (
    <div className="App">
      {acPower?.map((item, index) => (
        <div key={item.id}>
          <h4>Index: {index}</h4>
          <h4>{item.id}</h4>
          <p>{item.current}</p>
          <p>{item.voltage}</p>
          <p>{item.power}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
