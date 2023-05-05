import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import RealtimeChart from "./components/RealtimeChart/RealtimeChart";
import Table from "./components/Table/Table";
import moment, { Moment } from "moment";

type ServerReponse = {
  timestamp: string;
  value: number;
  hostname: string;
};

type Point = {
  x: Moment;
  y: number;
}


function App() {
  const ws = useRef<WebSocket | null>(null);
  const [chartData, setChartData] = useState<Point[]>([]);
  const [tableData, setTableData] = useState<any>({});

  useEffect(() => {
    init();
  }, [tableData]);

  const init = () => {
    if(ws.current == null) {
      ws.current = new WebSocket('ws://localhost:8080/connect/timer');
      ws.current.onopen = function () {
          console.log('WebSocket is open now.');
      };
      ws.current.onclose = function () {
          console.log('WebSocket is closed now.');
      };
      ws.current.onmessage = function (event) {
          const responseData: ServerReponse = JSON.parse(event.data);
          chartData.push({
              x: moment(responseData.timestamp),
              y: responseData.value,
          })
          if(chartData.length > 100) {
              chartData.shift();
          }
          const tmp = Object.assign({}, tableData);
          tmp[responseData.hostname] = moment(responseData.timestamp)
          setTableData(tmp);
      };
      return () => {
          ws.current?.close();
      };
    }
    
  }

  return (
    <div className='main'>
      <h1>Client - Server Communications</h1>
      <div className='container'>
        <div className='chart-holder'>
          <RealtimeChart chartData={chartData} />
        </div>
        <div className='chart-holder'>
          <Table tableData={tableData} />
        </div>
      </div>

    </div>
  );
}


export default App;
