import React from "react"

const Table = items => {
  const data = items.items

  return (
    <table>
      <thead>
        <tr>
          {
            data.head.map(el => (
              <th key={el} scope="col">{el}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.body.map(element => (
            <tr key={element}>
              {
                element.map(el => (
                  <td key={el} scope="col">{el}</td>
                ))
              }
            </tr>
          ))
        }

      </tbody>
    </table>
  )
}



export default Table