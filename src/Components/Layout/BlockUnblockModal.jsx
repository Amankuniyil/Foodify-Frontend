import React from 'react';
import Modal from 'react-modal';

const BlockUnblockModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const customStyles = {
    overlay: {
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      zIndex: 10000,
      background: 'none',
      border: 'none',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '90%',
      width: 'auto',
      padding: 0,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Block/Unblock Modal"
      overlayClassName="fixed inset-0"
      style={customStyles}
    >
      <div className="bg-black rounded-lg shadow-lg text-white w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto">
        <div className="p-8 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal">Are you sure?</h3>
          <div className="flex justify-center space-x-2">
            <button
              onClick={onConfirm}
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Confirm
            </button>
            <button
              onClick={onRequestClose}
              type="button"
              className="text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BlockUnblockModal;