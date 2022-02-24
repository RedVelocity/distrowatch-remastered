import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Combobox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Distribution } from '../services/getDistroList';

const SearchCard = ({ list }: { list: Distribution[] }): React.ReactElement => {
  const router = useRouter();
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
      {({ open }) => (
        <div className="mt-4">
          <div className="dark-white relative flex items-center gap-2 rounded-md py-2 px-4 shadow outline-none focus-within:ring">
            <FontAwesomeIcon icon={faSearch} />
            <Combobox.Input
              className="dark-white ml-1 w-full outline-none"
              // displayValue={(dist: Distribution) => dist.name}
              autoComplete="off"
              placeholder="search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Button>
              <FontAwesomeIcon icon={faChevronDown} />
            </Combobox.Button>
            {open && (
              <Transition
                as={React.Fragment}
                enter="transition ease-in-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-1 scale-100"
                leave="transition ease-in duration-500"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
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
                        >
                          {({ active }) => (
                            <li
                              className={`p-2 ${
                                active && 'bg-primary dark:bg-zinc-500'
                              }`}
                            >
                              <motion.button
                                type="button"
                                className="w-full text-left"
                                data-slug={dist.slug}
                                onClick={(e) =>
                                  router.push(
                                    `/distro/${e.currentTarget.attributes['data-slug'].value}`
                                  )
                                }
                                layoutId={dist.slug}
                              >
                                {dist.name}
                              </motion.button>
                            </li>
                          )}
                        </Combobox.Option>
                      ))
                    ) : (
                      <li className="select-none p-2">Nothing Found.</li>
                    )}
                  </div>
                </Combobox.Options>
              </Transition>
            )}
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default SearchCard;
