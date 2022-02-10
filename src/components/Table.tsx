/* eslint-disable react/display-name */
import React from 'react';

type TableProps = { children: React.ReactNode; className?: string };

const Table = ({
  children,
  className = '',
}: TableProps): React.ReactElement => (
  <div
    className={`${className} max-w-full overflow-x-auto bg-white dark:bg-gray-600 dark:text-gray-300`}
  >
    <table className="w-full">
      <tbody className="divide-y dark:divide-gray-400">{children}</tbody>
    </table>
  </div>
);

Table.Row = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <tr>{children}</tr>;

Table.Heading = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <td className="block pt-2 pb-1 font-medium md:table-cell md:w-1/4 md:p-2">
    {children}
  </td>
);

Table.Cell = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <td className="block pb-2 md:table-cell md:p-2">{children}</td>
);

export default Table;
