import React, { useState, useEffect } from 'react';
import { getTables } from '../services/api';

const TableListing = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Call the getTables service to fetch the list of tables
    getTables()
      .then((response) => {
        // Assuming the getTables service returns an array of table objects
        setTables(response.tables);
      })
      .catch((error) => {
        console.error('Error fetching tables:', error);
        // Handle the error, show error message to the user, etc.
      });
  }, []);

  return (
    <div className="table-listing">
      <h2>Tables</h2>
      {tables.length === 0 ? (
        <p>No tables found.</p>
      ) : (
        <ul>
          {tables.map((table) => (
            <li key={table._id}>
              <a href={`/table/${table._id}`}>{table.tableName}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableListing;
