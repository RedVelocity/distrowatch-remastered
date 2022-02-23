import React, { useState } from 'react';
import Link from 'next/link';
import { Combobox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Distribution } from '../services/getDistroList';

const SearchCard = ({ list }: { list: Distribution[] }): React.ReactElement => {
  const [selectedItem, setSelectedItem] = useState(list[0]);
  const [query, setQuery] = useState('');
  const filteredList =
    query === ''
      ? list
      : list.filter((dist) =>
          dist.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  return (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <div className="mt-4">
        <div className="dark-white relative flex items-center gap-2 rounded-md p-2 shadow outline-none focus-within:ring">
          <Combobox.Button>
            <FontAwesomeIcon icon={faSearch} />
          </Combobox.Button>
          <Combobox.Input
            className="dark-white ml-1 w-full outline-none"
            // displayValue={(dist: Distribution) => dist.name}
            autoComplete="off"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <Combobox.Options className="dark-white absolute top-[100%] left-0 z-20 mt-2 max-h-56 min-w-full divide-y overflow-y-auto rounded p-4 shadow-xl dark:divide-zinc-500">
            {filteredList.length > 0 &&
              filteredList.map((dist) => (
                <Combobox.Option
                  key={dist.slug}
                  value={dist}
                  as={React.Fragment}
                >
                  {({ active }) => (
                    <li
                      className={`p-2 ${
                        active && 'bg-primary dark:bg-zinc-500'
                      }`}
                    >
                      <Link href={`/distro/${dist.slug}`}>
                        <a className="block">{dist.name}</a>
                      </Link>
                    </li>
                  )}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  );
};

export default SearchCard;
