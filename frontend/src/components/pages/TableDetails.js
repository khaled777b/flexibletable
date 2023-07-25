import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTableById } from '../services/api';

const TableDetails = () => {
  const { tableId } = useParams();
  const [table, setTable] = useState(null);

  useEffect(() => {
    // Call the getTableById service to fetch the details of the specific table
    getTableById(tableId)
      .then((response) => {
        // Assuming the getTableById service returns the table object
        setTable(response.table);
      })
      .catch((error) => {
        console.error('Error fetching table details:', error);
        // Handle the error, show error message to the user, etc.
      });
  }, [tableId]);

  if (!table) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-details">
      <h2>{table.tableName}</h2>
      <p>Table ID: {table._id}</p>
      <p>Columns:</p>
      <ul>
        {table.columns.map((column) => (
          <li key={column._id}>
            {column.columnName} - {column.dataType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableDetails;
