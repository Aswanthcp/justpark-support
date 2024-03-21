import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getusers } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserPartials = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);

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

  const getUsersList = () => {
    axios
      .get(`${getusers}?page=${page}`, {
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
    getUsersList();
  }, [page, token]);

  return (
    <div>
      <div className="bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full  md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <span className=" text-center text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              User Details
            </span>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
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
                  <Link to={`${row.id}`}>{row.username}</Link>
                </td>
                <td className="px-6 py-4">{row.first_name}</td>
                <td className="px-6 py-4">{row.last_name}</td>
                <td className="px-6 py-4">{row.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPartials;
