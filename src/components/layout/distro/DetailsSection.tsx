import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import { Details } from '../../../models/Distro.d';
import Table from '../../Table';

type Props = {
  details: Details;
};
const DetailsSection = ({ details }: Props): React.ReactElement => (
  <Table className="holder">
    {details.map(
      (detail, index) =>
        detail[1].length > 0 && (
          <Table.Row key={index}>
            <Table.Heading>
              <span>
                {`${detail[0]} `}
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className="text-zinc-400 dark:text-current"
                />
              </span>
            </Table.Heading>
            <Table.Cell>
              {detail[1].map((links, i) => (
                <a href={links.link} target="_blank" rel="noreferrer" key={i}>
                  {i > 0 && (
                    <span className="text-zinc-500 dark:text-zinc-400">{` • `}</span>
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
