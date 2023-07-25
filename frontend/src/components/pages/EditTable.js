import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getTableById, updateTable } from '../services/api';

const EditTable = () => {
  const history = useHistory();
  const { tableId } = useParams();
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [dataType, setDataType] = useState('');

  useEffect(() => {
    // Fetch the table details using the tableId from the URL parameter
    getTableById(tableId)
      .then((response) => {
        // Assuming the getTableById service returns the table object
        const { tableName, columns } = response.table;
        setTableName(tableName);
        setColumns(columns);
      })
      .catch((error) => {
        console.error('Error fetching table details:', error);
        // Handle the error, show error message to the user, etc.
      });
  }, [tableId]);

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
      // Call the updateTable service to update the table
      updateTable(tableId, { tableName, columns })
        .then((response) => {
          // Assuming the updateTable service returns the updated table object
          console.log('Table updated:', response.table);
          // Redirect to the table details page for the updated table
          history.push(`/table/${response.table._id}`);
        })
        .catch((error) => {
          console.error('Error updating table:', error);
          // Handle the error, show error message to the user, etc.
        });
    }
  };

  return (
    <div className="edit-table">
      <h2>Edit Table</h2>
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
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTable;
