import React, { useState, useEffect } from 'react';
import TableComp from '../components/TableComp';
import '../Styles/table.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(['gene','variant']);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((response) => response.json())  
      .then((json) => setData(json.results))
      .catch(error => console.log(error))
  
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }


 const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <div>
        <input
          type='text'
          value={q}
          placeholder="Search"
          onChange={(e) => setQ(e.target.value)}
        />
        
      </div>
      <div>
        
        <TableComp  data={search(data)} />   
      </div>
    </div>

    

    
  );
}