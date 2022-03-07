import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Combobox } from '@headlessui/react';
import { useInputState } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Distribution } from '../services/getDistroList';

type SearchProps = {
  list: Distribution[];
  onSelect: (e) => void;
};
const SearchCard = ({ list, onSelect }: SearchProps): React.ReactElement => {
  const [query, setQuery] = useInputState('');
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
    <Combobox value={list[0]} onChange={onSelect}>
      {({ open }) => (
        <div className="mt-4">
          <div className="dark-white relative flex items-center rounded-md py-2 px-4 shadow outline-none focus-within:ring">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            <Combobox.Input
              className="dark-white ml-1 w-full outline-none"
              displayValue={(dist: Distribution) => dist.name}
              autoComplete="off"
              placeholder="search..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button>
              <FontAwesomeIcon icon={faChevronDown} />
            </Combobox.Button>
            <AnimatePresence>
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Combobox.Options
                    static
                    className="dark-white absolute top-[100%] left-0 z-20 mt-2 min-w-full overflow-hidden rounded-md p-4 shadow dark:shadow-primary/20"
                  >
                    <div className="max-h-72 divide-y overflow-y-auto dark:divide-zinc-500">
                      {filteredList.length > 0 ? (
                        filteredList.map((dist) => (
                          <Combobox.Option
                            key={dist.slug}
                            value={dist}
                            as={React.Fragment}
                            data-slug={dist.slug}
                          >
                            {({ active }) => (
                              <li
                                className={`p-2 ${
                                  active && 'bg-primary dark:bg-zinc-500'
                                }`}
                              >
                                {dist.name}
                              </li>
                            )}
                          </Combobox.Option>
                        ))
                      ) : (
                        <li className="select-none p-2">Nothing Found.</li>
                      )}
                    </div>
                  </Combobox.Options>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default SearchCard;
