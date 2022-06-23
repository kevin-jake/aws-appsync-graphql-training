import React, { useState, useEffect } from "react";
import "./App.css";
import { a, Amplify, API, graphqlOperation } from "aws-amplify";
import config from "./aws-exports";
import { listTodos, todosByDate } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
import { Category, ChartComponent, Inject, LineSeries, SeriesCollectionDirective, SeriesDirective, Legend, DataLabel, Tooltip, DateTime, Zoom, ScrollBar } from '@syncfusion/ej2-react-charts'
import { DateRangePickerComponent, DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";


Amplify.configure(config);

function App() {
  const [acPower, setacPower] = useState([]);
  const [minDate, setminDate] = useState(new Date("2022-06-23T12:30:14.656Z"))
  const [maxDate, setmaxDate] = useState(new Date("2022-06-23T12:33:46.346Z"))
  

  const onChangeTime = (event) => {
    console.log(event.element.id)
    if (event.element.id === "datetimepicker_min") {
      setminDate(event.value)
    }
    if (event.element.id === "datetimepicker_max") {
      setmaxDate(event.value)
    }
  }

  useEffect(() => {
    fetchACPower()
  }, [minDate, maxDate])
  

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
        // acData.shift()
        setacPower(acData);
      },
    });
    return () => subscription.unsubscribe();
  }, [acPower]);

  const fetchACPower = async () => {
    const apiData = await API.graphql(graphqlOperation(todosByDate, {
      type: 'test', sortDirection: 'ASC',
      createdAt: {between: [minDate, maxDate]}
    }));
    // console.log(apiData)
    setacPower(apiData.data.todosByDate.items);
  };

  console.log(acPower);
  const zoomSettings={enableMouseWheelZooming: true, enablePinchZooming: true, enableScrollbar: true,
    enableSelectionZooming: true}
  return (
    <div className="App">
      <div>
        <p> Start Time</p>
        <DateTimePickerComponent id="datetimepicker_min" value={minDate}  change={onChangeTime}/>   
      </div>
      <div>
        <p> End Time</p>
        <DateTimePickerComponent id="datetimepicker_max" value={maxDate}  change={onChangeTime}/></div>
      
      {/* {acPower?.map((item, index) => (
        <div key={item.id}>
          <h4>Index: {index}</h4>
          <h4>{item.id}</h4>
          <p>{item.current}</p>
          <p>{item.voltage}</p>
          <p>{item.power}</p>
        </div>
      ))} */}
      <ChartComponent zoomSettings={zoomSettings} primaryXAxis={{valueType:"DateTime", title:"Time", minimum: minDate, maximum: maxDate, enableAutoIntervalOnZooming: true}} primaryYAxis={{title: "Voltage", minimum: 0, maximum: 300}} legendSettings={{visible:true}} tooltip={{enable:true}}>
        <Inject services={[LineSeries, Category, Legend, DataLabel, Tooltip, DateTime, Zoom, ScrollBar]}></Inject>
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
