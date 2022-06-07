import React, { useState, useEffect } from "react";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import config from "./aws-exports";
import { listACPowers } from "./graphql/queries";

Amplify.configure(config);

function App() {
  const [acPower, setacPower] = useState([]);

  useEffect(() => {
    fetchACPower();
  }, []);

  const fetchACPower = async () => {
    const apiData = await API.graphql({
      query: listACPowers,
    });
    setacPower(apiData.data.listACPowers.items);
    console.log(apiData);
  };

  // console.log(acPower);

  return (
    <div className="App">
      {acPower?.map((item) => (
        <div key={item.id}>
          <h2>{item.id}</h2>
          <p>{item.current}</p>
          <p>{item.voltage}</p>
          <p>{item.power}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
