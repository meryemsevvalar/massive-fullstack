import React from 'react';
import '../Styles/table.css';

export default function TableComp({ data }) {
  console.log(data[0])
  const columns = data[0] && Object.keys(data[0]);


  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>
        <th id='variant'>Variant</th>
        <th id='gene'>Gene</th>
        <th id='classification'>Classification</th>
        <th id='frequency'>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.variant}</td>
            <td>{row.gene}</td>
            <td>{row.classification}</td>
            <td>{row.frequency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}