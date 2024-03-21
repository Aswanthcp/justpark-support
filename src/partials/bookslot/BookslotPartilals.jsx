import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getBookings } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const BookslotPartilals = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const support = useSelector((state) => state.support);

  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });

  const handleError = (error) => {
    console.error("Error fetching users:", error);
    // Handle error here, e.g., show error message to the user
  };

  const getBookingsList = (support) => {
    axios
      .get(`${getBookings}?support=${support.username}&page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPagination(response.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    getBookingsList(support);
  }, [page, token]);
  return (
    <div>
      <div className="bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <span className=" text-center text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              Rervations Details
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              className="flex items-center justify-center text-dark bg-gray-100 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              <Link to="/Reservations/add/">Add Reservations</Link>
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slot Number
              </th>
              <th scope="col" className="px-6 py-3">
                Car Number
              </th>
              <th scope="col" className="px-6 py-3">
                Reservation Time
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {pagination.results.map((row, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
              >
                <td className="px-6 py-4 font-medium text-blue-900 whitespace-nowrap dark:text-white">
                  <Link to={`${row.id}`}>{row.user.username}</Link>
                </td>
                <td className="px-6 py-4">{row.slot.slot_number}</td>
                <td className="px-6 py-4">{row.car_number}</td>
                <td className="px-6 py-4">{row.reservation_time}</td>
                <td className="px-6 py-4">{row.phone_number}</td>
                <td className="px-6 py-4">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookslotPartilals;
