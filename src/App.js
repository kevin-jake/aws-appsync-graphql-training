import React, { useState, useEffect } from "react";
import "./App.css";
import { a, Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { listACPowers } from "./graphql/queries";
import { onCreateACPower } from "./graphql/subscriptions";

Amplify.configure(config);

function App() {
  const [acPower, setacPower] = useState([]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateACPower)
    ).subscribe({
      next: (data) => {
        const {
          value: {
            data: { onCreateACPower },
          },
        } = data;
        const acData = [...acPower, onCreateACPower];
        setacPower(acData);
      },
    });
    return () => subscription.unsubscribe();
  }, [acPower]);

  // const fetchACPower = async () => {
  //   const apiData = await API.graphql({
  //     query: listACPowers,
  //   });
  //   setacPower(apiData.data.listACPowers.items);
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
