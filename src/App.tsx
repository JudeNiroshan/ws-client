import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import RealtimeChart from "./components/RealtimeChart/RealtimeChart";
import Table from "./components/Table/Table";
import moment, { Moment } from "moment";
import { table } from 'console';
import ReconnectingWebSocket from 'reconnecting-websocket';

type ServerReponse = {
  timestamp: string;
  value: number;
  hostname: string;
  version: string;
};

function App() {
  const rws = useRef<ReconnectingWebSocket | null>(null);
  const [chartData, setChartData] = useState<any>({});
  const [tableData, setTableData] = useState<any>({
  });

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    if(rws.current == null) {
      const options = {
        minReconnectionDelay: 200,
        maxReconnectionDelay: 10000,
        reconnectionDelayGrowFactor: 1,
        connectionTimeout: 9000,
        minUptime: 3000
      }
      //https://ws-server-temenos-demo.apps.ocp-dev01.lab.eng.tlv2.redhat.com/

      rws.current = new ReconnectingWebSocket('ws://ws-server-temenos-demo.apps.ocp-dev01.lab.eng.tlv2.redhat.com/connect/timer', [], options);
      // rws.current = new ReconnectingWebSocket('ws://localhost:8080/connect/timer', [], options);

      rws.current.addEventListener('open', () => {
          console.log('WebSocket is open now.');
          rws.current?.send(moment().format("YYYY-MM-DDTHH:mm:ss"));
      });
      rws.current.addEventListener('close', () => {
          console.log('WebSocket is closed now.');
      });
      rws.current.addEventListener('message', (event: MessageEvent<string>) => {
          const responseData: ServerReponse = JSON.parse(event.data);
          console.log (responseData);
          const key = responseData.hostname + ':' + responseData.version;
          const server = chartData[key];
          
          if(!server) {
            chartData[key] = [{
              x: moment(responseData.timestamp),
              y: responseData.value,
            }];
            
            setChartData(chartData);

          }else{
            server.push({
              x: moment(responseData.timestamp),
              y: responseData.value,
            });
            if(server.length > 130) {
              server.shift();
            }
          }

          // console.log("jude"+JSON.stringify(chartData));
          // console.log("tableData==="+JSON.stringify(tableData));

          const tmp = JSON.parse(JSON.stringify(tableData));
          tableData[key] = moment(responseData.timestamp)
          // console.log("tmp==="+JSON.stringify(tmp));
          setTableData(tmp);
      });
      
      return () => {
          rws.current?.close();
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
