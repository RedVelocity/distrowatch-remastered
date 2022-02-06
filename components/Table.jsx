const Table = ({ children, className = '' }) => (
  <div className={`${className} max-w-full overflow-x-auto bg-white`}>
    <table className="w-full">
      <tbody className="divide-y">{children}</tbody>
    </table>
  </div>
);

Table.Row = ({ children }) => <tr>{children}</tr>;

Table.Heading = ({ children }) => (
  <td className="block pt-2 pb-1 font-medium md:table-cell md:w-1/4 md:p-2">
    {children}
  </td>
);

Table.Cell = ({ children }) => (
  <td className="block pb-2 md:table-cell md:p-2">{children}</td>
);

export default Table;
