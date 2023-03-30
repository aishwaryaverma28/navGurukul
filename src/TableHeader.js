import React, { useState } from 'react';

const DataTable = () => {
const data = ["aish", "verma", "dhawal", "shiv", "rekha"];
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    console.log(filteredData);
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue === bValue) {
      return 0;
    }
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          {(data).map((columnName) => (
            <th key={columnName} onClick={() => handleSort(columnName)}>
              {columnName}
              {sortColumn === columnName && (
                <span>{sortOrder === 'asc' ? ' up' : 'down'}</span>
               )}
            </th>
          ))}
        </tr>
        <tr>
          {(data).map((columnName) => (
            <th key={columnName}>
              <input type="text" onChange={handleFilter} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cellValue, cellIndex) => (
              <td key={cellIndex}>{cellValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
