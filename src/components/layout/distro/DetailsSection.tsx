import React from 'react';
import { Details } from '../../../models/Distro.d';
import Table from '../../Table';

type Props = {
  details: Details;
};
const DetailsSection = ({ details }: Props): React.ReactElement => (
  <Table className="holder border-t dark:border-0">
    {details.map(
      (detail, index) =>
        detail[1].length > 0 && (
          <Table.Row key={index}>
            <Table.Heading>
              <span>
                {`${detail[0]} `}
                <i className="fas fa-external-link-alt h-3 w-3 text-gray-400" />
              </span>
            </Table.Heading>
            <Table.Cell>
              {detail[1].map((links, i) => (
                <a href={links.link} target="_blank" rel="noreferrer" key={i}>
                  {i > 0 && (
                    <span className="text-gray-500 dark:text-gray-400">{` • `}</span>
                  )}
                  {links.text}
                </a>
              ))}
            </Table.Cell>
          </Table.Row>
        )
    )}
  </Table>
);

export default DetailsSection;
