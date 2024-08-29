import React from "react";
import SideBar from "../components/SideBar";
import CustomerCard from "../components/CustomerCard";

interface Customer {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
}

interface User {
    username: string;
    password: string;
    role: string;
}

export default function Customer() {
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [user, setUser] = React.useState<User>({
        username: "",
        password: "",
        role: "",
    });

    const [filters, setFilters] = React.useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dateOfBirth: "",
    });

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const token = localStorage.getItem("token");

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    const response = await fetch(
                        "http://localhost:5000/auth/profile",
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch user profile");
                    }
                    setUser(await response.json());
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();

        const fetchCustomers = async () => {
            if (!token) {
                return;
            } else {
                try {
                    const response = await fetch(
                        "http://localhost:5000/customers",
                        {
                            method: "GET",
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch customers");
                    }
                    setCustomers(await response.json());
                } catch (error) {
                    console.error("Error fetching customers:", error);
                }
            }
        };

        fetchCustomers();
    }, [token]);

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.fullName
                .toLowerCase()
                .includes(filters.fullName.toLowerCase()) &&
            customer.phoneNumber
                .toLowerCase()
                .includes(filters.phoneNumber.toLowerCase()) &&
            customer.email
                .toLowerCase()
                .includes(filters.email.toLowerCase()) &&
            customer.gender
                .toLowerCase()
                .includes(filters.gender.toLowerCase()) &&
            customer.dateOfBirth.toString().includes(filters.dateOfBirth)
        );
    });

    // Paginate the filtered customers
    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="py-8 ml-64 w-full space-y-4 px-8">
                <div className="flex items-center flex-row justify-between">
                    <h1 className="text-3xl font-bold">Customers</h1>
                    <button
                        onClick={() => {
                            window.location.href = "/dashboard/add-customer";
                        }}
                        className="bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-md"
                    >
                        Add Customer +
                    </button>
                </div>

                {/* Filter Inputs */}
                <div className="flex flex-row justify-between pr-20 py-4 w-full">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={filters.fullName}
                        onChange={(e) =>
                            setFilters({ ...filters, fullName: e.target.value })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={filters.phoneNumber}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                phoneNumber: e.target.value,
                            })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) =>
                            setFilters({ ...filters, email: e.target.value })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        value={filters.gender}
                        onChange={(e) =>
                            setFilters({ ...filters, gender: e.target.value })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={filters.dateOfBirth}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                dateOfBirth: e.target.value,
                            })
                        }
                        className="border p-2"
                    />
                </div>

                <div>
                    <div className="w-full bg-zinc-100 font-montserrat text-[16px] font-medium pl-4 pr-20 py-4">
                        <div className="flex justify-between font-extrabold text-left">
                            <div className="flex-1 text-center">Full Name</div>
                            <div className="flex-1 text-center">
                                Phone Number
                            </div>
                            <div className="flex-1 text-center">Email</div>
                            <div className="flex-1 text-center">Gender</div>
                            <div className="flex-1 text-center">
                                Date of Birth
                            </div>
                        </div>
                    </div>
                </div>

                {currentCustomers.map((customer) => (
                    <CustomerCard key={customer._id} customer={customer} />
                ))}

                {/* Pagination Controls */}
                <div className="flex justify-between items-center py-4">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
                    >
                        Previous
                    </button>
                    <span className="font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}