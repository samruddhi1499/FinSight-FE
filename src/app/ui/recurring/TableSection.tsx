import React, { useMemo, useState } from 'react';
import EditCapModal from './EditCapModal';

interface RecurringCategories {
  categoryId: number;
  category: string;
  capAmount: number;
}
interface Props {
  recurringCategory: RecurringCategories[];
  errorCode: string;
}

export default function TableSection({ recurringCategory, errorCode }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState({
    category: '',
    capAmount: 0.0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;

  const totalItems = recurringCategory?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  // Slice the data for the current page (memoized)
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return recurringCategory.slice(start, start + rowsPerPage);
  }, [recurringCategory, currentPage]);

  const goToPage = (page: number) => {
    const valid = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(valid);
  };

  const handleSave = async (newAmount: number) => {
    setIsModalOpen(false);
    try {
      const response = await fetch(`/api/RecurringCategories/update-categories`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          category: updateCategory.category,
          capAmount: newAmount,
        }),
      });
      if (!response.ok) throw new Error('Failed to save data');

      setUpdateCategory((prev) => ({ ...prev, capAmount: newAmount }));

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/RecurringCategories/delete-categories/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete data');

      setTimeout(() => {
        // If current page becomes empty after delete, go back a page (if possible)
        const newTotal = totalItems - 1;
        const newTotalPages = Math.max(1, Math.ceil(newTotal / rowsPerPage));
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error(error);
      alert('Error deleting category');
    }
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900   bg-white ">
          Our products
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch,
            grow your business, and more.
          </p>
        </caption>

        <thead className="text-xs text-gray-700 uppercase bg-blue-100  dark:text-gray-600">
          <tr>
            <th scope="col" className="px-6 text-center py-3">
              Category
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Price
            </th>
            <th scope="col" className="px-6 text-center py-3">
              Actions
            </th>
          </tr>
        </thead>

        {errorCode != '400' ? (
          <tbody>
            {currentItems.map((cat) => (
              <tr key={cat.categoryId} className="bg-white border-b  dark:border-gray-200 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap ">
                  {cat.category}
                </th>
                <td className="px-6 py-4 text-gray-500 text-center">{`$${cat.capAmount}`}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setUpdateCategory((prev) => ({
                        ...prev,
                        category: cat.category,
                        capAmount: cat.capAmount,
                      }));
                    }}
                    className="font-medium text-blue-600 pr-1 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete?')) {
                        handleDelete(cat.categoryId);
                      }
                    }}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                Add Recurring Categories
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {/* Pagination controls */}
      <div className="flex items-center m-2 justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems}
        </div>

        <nav className="inline-flex items-center space-x-2" aria-label="Pagination">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>

      

          <p> {currentPage} - {totalPages}</p>

       

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Last
          </button>
        </nav>
      </div>

      <EditCapModal initialCapAmount={updateCategory.capAmount} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </>
  );
}
