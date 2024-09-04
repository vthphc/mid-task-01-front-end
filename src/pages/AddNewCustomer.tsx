import React from "react";
import SideBar from "../components/SideBar";

interface Customer {
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: string;
}

export default function AddNewCustomer() {
    const [newCustomer, setNewCustomer] = React.useState<Customer>({
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dateOfBirth: "",
    });

    const [isCustomerNameValid, setIsCustomerNameValid] = React.useState(true);
    const [isCustomerEmailValid, setIsCustomerEmailValid] =
        React.useState(true);
    const [isCustomerPhoneNumberValid, setIsCustomerPhoneNumberValid] =
        React.useState(true);
    const [isCustomerGenderValid, setIsCustomerGenderValid] =
        React.useState(true);
    const [isDateOfBirthValid, setIsDateOfBirthValid] = React.useState(true);

    const [isCustomerEmailExists, setIsCustomerEmailExists] =
        React.useState(true);
    const [isCustomerPhoneNumberExists, setIsCustomerPhoneNumberExists] =
        React.useState(true);

    const validateCustomerName = (customer: Customer) => {
        if (customer.fullName.trim().length === 0) {
            setIsCustomerNameValid(false);
            return false;
        }

        if (customer.fullName.length < 3) {
            setIsCustomerNameValid(false);
            return false;
        }

        setIsCustomerNameValid(true);
        return true;
    };

    const validateCustomerGender = (customer: Customer) => {
        if (customer.gender === "") {
            setIsCustomerGenderValid(false);
            return false;
        }

        setIsCustomerGenderValid(true);
        return true;
    };

    const validateCustomerEmail = (customer: Customer) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(customer.email)) {
            setIsCustomerEmailValid(false);
            return false;
        }

        setIsCustomerEmailValid(true);
        return true;
    };

    const validateCustomerPhoneNumber = (customer: Customer) => {
        const phonePattern = /^0\d{9}$/;

        if (!phonePattern.test(customer.phoneNumber)) {
            setIsCustomerPhoneNumberValid(false);
            return false;
        }

        setIsCustomerPhoneNumberValid(true);
        return true;
    };

    const validateDateOfBirth = (customer: Customer) => {
        const { dateOfBirth } = customer;
        if (!dateOfBirth) {
            setIsDateOfBirthValid(false);
            return false;
        }

        const dob = new Date(dateOfBirth);
        const today = new Date();

        if (dob > today) {
            setIsDateOfBirthValid(false);
            return false;
        }

        setIsDateOfBirthValid(true);
        return true;
    };

    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!token) {
            alert("Unauthorized access. Please login.");
            window.location.href = "/";
            return;
        }

        if (!validateCustomerName(newCustomer)) {
            return;
        }

        if (!validateCustomerPhoneNumber(newCustomer)) {
            return;
        }

        if (!validateCustomerEmail(newCustomer)) {
            return;
        }

        if (!validateDateOfBirth(newCustomer)) {
            return;
        }

        if (!validateCustomerGender(newCustomer)) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCustomer),
            });

            console.log(response.status);

            if (response.status === 410) {
                setIsCustomerEmailExists(false);
                throw new Error("Failed to add new customer");
            } else {
                setIsCustomerEmailExists(true);
            }

            if (response.status === 411) {
                setIsCustomerPhoneNumberExists(false);
                throw new Error("Failed to add new customer");
            } else {
                setIsCustomerPhoneNumberExists(true);
            }

            if (response.ok) {
                setNewCustomer({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    gender: "",
                    dateOfBirth: "",
                });
                alert("New customer added successfully");
                window.location.href = "/dashboard/customers";
            }
        } catch (error) {
            console.error("Failed to add new customer:", error);
        }
    };

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="py-8 ml-64 w-full space-y-4 px-8">
                <div className="flex items-center flex-row justify-between">
                    <h1 className="text-3xl font-bold">Add New Customer</h1>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-md"
                    >
                        Add +
                    </button>
                </div>
                <div className="flex w-full px-48 flex-col space-y-2">
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="username"
                    >
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        className={`w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light ${
                            isCustomerNameValid
                                ? `border-[#a1a1a1]`
                                : `border-red-600`
                        } p-4`}
                        required
                        value={newCustomer.fullName}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                fullName: e.target.value,
                            })
                        }
                    />
                    {!isCustomerNameValid && (
                        <p className="text-red-500 text-right text-sm">
                            Invalid name.
                        </p>
                    )}
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="phoneNumber"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className={`w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light ${
                            isCustomerPhoneNumberValid
                                ? `border-[#a1a1a1]`
                                : `border-red-600`
                        } p-4`}
                        required
                        value={newCustomer.phoneNumber}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                    {!isCustomerPhoneNumberValid && (
                        <p className="text-red-500 text-right text-sm">
                            Phone number must be 10 characters long and start
                            with 0.
                        </p>
                    )}
                    {!isCustomerPhoneNumberExists && (
                        <p className="text-red-500 text-right text-sm">
                            Phone number already exists.
                        </p>
                    )}
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light ${
                            isCustomerEmailValid
                                ? `border-[#a1a1a1]`
                                : `border-red-600`
                        } p-4`}
                        required
                        value={newCustomer.email}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                email: e.target.value,
                            })
                        }
                    />
                    {!isCustomerEmailValid && (
                        <p className="text-red-500 text-right text-sm">
                            Invalid email address.
                        </p>
                    )}
                    {!isCustomerEmailExists && (
                        <p className="text-red-500 text-right text-sm">
                            Email already exists.
                        </p>
                    )}
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="dateOfBirth"
                    >
                        Date of Birth
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        className={`w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light ${
                            isDateOfBirthValid
                                ? `border-[#a1a1a1]`
                                : `border-red-600`
                        } p-4`}
                        required
                        value={newCustomer.dateOfBirth}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                dateOfBirth: e.target.value,
                            })
                        }
                    />
                    {!isDateOfBirthValid && (
                        <p className="text-red-500 text-right text-sm">
                            Invalid date of birth.
                        </p>
                    )}
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="gender"
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        className={`w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light ${
                            isCustomerGenderValid
                                ? `border-[#a1a1a1]`
                                : `border-red-600`
                        } p-4`}
                        required
                        value={newCustomer.gender}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                gender: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="PreferNotToSay">
                            Prefer Not to Say
                        </option>
                    </select>
                    {!isCustomerGenderValid && (
                        <p className="text-red-500 text-right text-sm">
                            Please select gender.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
