import React from 'react';

const FeedbackModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-">
      <div className="bg-white rounded-lg p-6 w-1/3 m-4">
        <h2 className="text-xl mb-4">We value your feedback!</h2>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Please leave your feedback here..."
        ></textarea>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={onClose}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
