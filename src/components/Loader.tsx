import React, { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { LoadingContext } from '../lib/context/loadingContext';

const Loader = (): React.ReactElement => {
  const { loading, setLoading } = useContext(LoadingContext);
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
      open={loading}
      onClose={setLoading}
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
};

export default Loader;
