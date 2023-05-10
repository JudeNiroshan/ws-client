import moment from 'moment';
import React,{ useEffect } from 'react';
import './Table.css'

const Table = (props: {tableData: any}) => {

    return (
      <table>
        <thead>
          <tr>
            <th>Server hostname : Version</th>
            <th>Last Connected</th>
          </tr>
        </thead>
        <tbody>
            {props.tableData && Object.keys(props.tableData).map((hostname) => (
                <tr key={hostname}>
                    <td>{hostname}</td>
                    <td><strong>{moment(props.tableData[hostname]).format("DD MMMM YYYY HH:mm:ss")}</strong></td>
                </tr>
            ))}
        </tbody>
      </table>
    );
}


export default Table;