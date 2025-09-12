import React, { useState } from 'react';

interface EditCapModalProps {
  initialCapAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCapAmount: number) => void;
}

export default function EditCapModal({ initialCapAmount, isOpen, onClose, onSave }: EditCapModalProps) {
  const [capAmount, setCapAmount] = useState(initialCapAmount);

  // Reset input when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCapAmount(initialCapAmount);
    }
  }, [isOpen, initialCapAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/45  bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Cap Amount</h2>

        <input
          type="number"
          value={capAmount}
          onChange={(e) => setCapAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 text-lg"
        />

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(capAmount)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
