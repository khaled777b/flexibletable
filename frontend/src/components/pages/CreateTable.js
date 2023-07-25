import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createTable } from '../services/api';

const CreateTable = () => {
  const history = useHistory();
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [dataType, setDataType] = useState('');

  const addColumn = () => {
    if (columnName && dataType) {
      setColumns([...columns, { columnName, dataType }]);
      setColumnName('');
      setDataType('');
    }
  };

  const removeColumn = (index) => {
    const updatedColumns = columns.filter((column, i) => i !== index);
    setColumns(updatedColumns);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tableName && columns.length > 0) {
      // Call the createTable service to create the new table
      createTable({ tableName, columns })
        .then((response) => {
          // Assuming the createTable service returns the newly created table object
          console.log('Table created:', response.table);
          // Redirect to the table details page for the newly created table
          history.push(`/table/${response.table._id}`);
        })
        .catch((error) => {
          console.error('Error creating table:', error);
          // Handle the error, show error message to the user, etc.
        });
    }
  };

  return (
    <div className="create-table">
      <h2>Create a New Table</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tableName">Table Name</label>
          <input
            type="text"
            id="tableName"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Columns</label>
          <div className="columns-list">
            {columns.map((column, index) => (
              <div key={index} className="column-item">
                {column.columnName} - {column.dataType}
                <button type="button" onClick={() => removeColumn(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="column-inputs">
            <input
              type="text"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Column Name"
              required
            />
            <input
              type="text"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              placeholder="Data Type"
              required
            />
            <button type="button" onClick={addColumn}>
              Add Column
            </button>
          </div>
        </div>
        <button type="submit">Create Table</button>
      </form>
    </div>
  );
};

export default CreateTable;
