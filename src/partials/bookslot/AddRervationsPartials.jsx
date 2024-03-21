import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../utils/axios";
import {
  add_new_reservations,
  getParkingSlotbyplace,
} from "../../utils/Constants"; // Assuming you have a constant for the API endpoint
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddRervationsPartials = () => {
  const token = useSelector((state) => state.token);
  const placeName = useSelector((state) => state.place);
  const support = useSelector((state) => state.support);
  const navigate = useNavigate();
  const [slotNumbers, setSlotNumbers] = useState([]);
  const [selectedSlotNumber, setSelectedSlotNumber] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      phone_number: "",
      slot_number: "",
      place_name: "",
      support_id: support.id,
    },

    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "user Name is required";
      }

      if (!values.place_name) {
        errors.place_name = "place_name is required";
      }
      if (!values.phone_number) {
        errors.phone_number = "phone_number is required";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const requestData = { ...values, support_id: support.id };

        await axios.post(add_new_reservations, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate('/Reservations');
        toast.success("Place details updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to update place details", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        console.error("Error updating place details:", error);
      }
      setSubmitting(false);
    },
  });
  const handleError = (error) => {
    console.error("Error fetching users:", error);
    // Handle error here, e.g., show error message to the user
  };

  const getSlotList = () => {
    axios
      .get(`${getParkingSlotbyplace}${placeName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSlotNumbers(response.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    getSlotList();
    console.log(support.id);
  }, [token]);

  return (
    <section className="flex items-center justify-center px-2 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="w-full xl:w-full xl:max-w-sm 2xl:max-w-xl">
        <h2 className="text-center text-2xl font-bold leading-tight uppercase font-sans text-black">
          Page Details
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="m-2 space-y-5 overflow-hidden"
        >
          {" "}
         
          <div>
            <label
              htmlFor="username"
              className="text-base font-medium text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                name="username"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                placeholder="user Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="place_name"
              className="text-base font-medium text-gray-900"
            >
              place name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="place_name"
                name="place_name"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                placeholder="place name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.place_name}
              />
              {formik.touched.place_name && formik.errors.place_name ? (
                <div className="text-red-500">{formik.errors.place_name}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="slot_number"
              className="text-base font-medium text-gray-900"
            >
              Slots
            </label>
            <div className="mt-2">
              <select
                id="slot_number"
                name="slot_number"
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                onChange={(e) => {
                  setSelectedSlotNumber(e.target.value);
                  formik.setFieldValue("slot_number", e.target.value); // Set form value
                }}
                value={selectedSlotNumber}
              >
                <option value="">Select Slot Number</option>
                {slotNumbers.map((slotNumber) => (
                  <option key={slotNumber.id} value={slotNumber.id}>
                    {slotNumber.slot_number}
                  </option>
                ))}
              </select>
              {formik.touched.slot_number && formik.errors.slot_number ? (
                <div className="text-red-500">{formik.errors.slot_number}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="car_number"
              className="text-base font-medium text-gray-900"
            >
              Car Number
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="car_number"
                name="car_number"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                placeholder="car number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.car_number}
              />
              {formik.touched.car_number && formik.errors.car_number ? (
                <div className="text-red-500">{formik.errors.car_number}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="text-base font-medium text-gray-900"
            >
              phone number
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                placeholder="phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
              />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <div className="text-red-500">{formik.errors.phone_number}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="time_reserved"
              className="text-base font-medium text-gray-900"
            >
              time_reserved
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="time_reserved"
                name="time_reserved"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                placeholder="phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time_reserved}
              />
              {formik.touched.time_reserved && formik.errors.time_reserved ? (
                <div className="text-red-500">
                  {formik.errors.time_reserved}
                </div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-800"
          >
            {formik.isSubmitting ? "Submitting..." : "ADD"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddRervationsPartials;
