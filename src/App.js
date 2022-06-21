import React, { useState, useEffect } from "react";
import "./App.css";
import { a, Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { listTodos, todosByDate } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
import { Category, ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Legend, DataLabel, Tooltip, DateTime } from '@syncfusion/ej2-react-charts'


Amplify.configure(config);

function App() {
  const [acPower, setacPower] = useState([]);

  useEffect(() => {
    fetchACPower()
  }, [])
  

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
        acData.shift()
        setacPower(acData);
      },
    });
    return () => subscription.unsubscribe();
  }, [acPower]);

  const fetchACPower = async () => {
    const apiData = await API.graphql(graphqlOperation(todosByDate, { type: 'test', limit: 10, sortDirection: 'ASC' }));
    // console.log(apiData)
    setacPower(apiData.data.todosByDate.items);
  };

  console.log(acPower);

  return (
    <div className="App">
      {/* {acPower?.map((item, index) => (
        <div key={item.id}>
          <h4>Index: {index}</h4>
          <h4>{item.id}</h4>
          <p>{item.current}</p>
          <p>{item.voltage}</p>
          <p>{item.power}</p>
        </div>
      ))} */}
      <ChartComponent primaryXAxis={{valueType:"DateTime", title:"Time"}} primaryYAxis={{title: "Voltage", minimum: 220, maximum: 230}} legendSettings={{visible:true}} tooltip={{enable:true}}>
        <Inject services={[LineSeries, Category, Legend, DataLabel, Tooltip, DateTime]}></Inject>
        <SeriesCollectionDirective>
          <SeriesDirective type="Line" dataSource={acPower} xName="createdAt" yName="voltage" name="Voltage"
          marker={{dataLabel:{visible: true}, visible: true}}
          >

          </SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default App;
