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

    const validateCustomer = (customer: Customer) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^0\d{9}$/;

        if (!emailPattern.test(customer.email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!phonePattern.test(customer.phoneNumber)) {
            alert("Phone number must be 10 digits and start with '0'.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateCustomer(newCustomer)) {
            return;
        }

        const { dateOfBirth } = newCustomer;
        const dob = new Date(dateOfBirth);
        const today = new Date();

        if (dob > today) {
            alert("Invalid date: Date of birth cannot be in the future");
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

            if (!response.ok) {
                throw new Error("Failed to add new customer");
            }

            alert("New customer added successfully");
            setNewCustomer({
                fullName: "",
                phoneNumber: "",
                email: "",
                gender: "",
                dateOfBirth: "",
            });
            window.location.href = "/dashboard/customers";
        } catch (error) {
            alert("Phone number or email already exist");
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
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.fullName}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                fullName: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="phoneNumber"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="text"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.phoneNumber}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.email}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                email: e.target.value,
                            })
                        }
                    />
                    <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="dateOfBirth"
                    >
                        Date of Birth
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
                        required
                        value={newCustomer.dateOfBirth}
                        onChange={(e) =>
                            setNewCustomer({
                                ...newCustomer,
                                dateOfBirth: e.target.value,
                            })
                        }
                    />
                                        <label
                        className="font-montserrat text-[14px] font-light"
                        htmlFor="gender"
                    >
                        Gender
                    </label>
                    <select
                        id="gender"
                        className="w-full focus:outline-none font-montserrat focus:border-zinc-800 border text-[14px] font-light border-[#a1a1a1] p-4"
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="preferNotToSay">
                            Prefer Not to Say
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}
