import React from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

type PageProps = {
  isLoading: boolean;
  setIsLoading: () => void;
};

const Loader = ({ isLoading, setIsLoading }: PageProps): React.ReactElement => (
  <Dialog
    as="div"
    className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
    open={isLoading}
    onClose={setIsLoading}
  >
    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur" />
    <div className="z-10 flex flex-col items-center justify-center rounded-2xl bg-white/70 px-20 py-6 backdrop-blur">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Loading
      </Dialog.Title>
      <Dialog.Description className="mt-2">
        <FontAwesomeIcon icon={faCircleNotch} spin size="4x" />
      </Dialog.Description>
    </div>
  </Dialog>
);

export default Loader;
