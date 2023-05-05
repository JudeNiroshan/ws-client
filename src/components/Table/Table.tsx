import moment from 'moment';
import React,{ useEffect } from 'react';
import './Table.css'

const Table = (props: {tableData: any}) => {
    const { tableData } = props;

    return (
      <table>
        <thead>
          <tr>
            <th>Hostname</th>
            <th>Last Connected</th>
          </tr>
        </thead>
        <tbody>
            {tableData && Object.keys(tableData).map((hostname) => (
                <tr key={hostname}>
                    <td>{hostname}</td>
                    <td>{moment(tableData[hostname]).toISOString()}</td>
                </tr>
            ))}
        </tbody>
      </table>
    );
}


export default Table;