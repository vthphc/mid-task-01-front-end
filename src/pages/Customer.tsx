import React from "react";
import SideBar from "../components/SideBar";
import CustomerCard from "../components/CustomerCard";
import debounce from "lodash.debounce";

interface Customer {
    id: number;
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

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const filteredCustomers = customers.filter((customer) => {
        const customerYear = new Date(customer.dateOfBirth).getFullYear();
        const filterYear = filters.dateOfBirth
            ? new Date(filters.dateOfBirth).getFullYear()
            : "";

        const validGender = filters.gender ? filters.gender.toLowerCase() : "";

        return (
            (validGender === "" ||
                customer.gender.toLowerCase() === validGender) &&
            customerYear.toString().includes(filterYear.toString())
        );
    });

    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const [searchKeyword, setSearchKeyword] = React.useState("");

    const handleSearch = async () => {
        if (!token) {
            return;
        } else {
            if (searchKeyword === "") {
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
            } else {
                try {
                    const response = await fetch(
                        `http://localhost:5000/customers/search/${searchKeyword}`,
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
        }
    };

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="pt-4 ml-64 w-full space-y-1 px-8">
                <div className="flex items-center flex-row justify-between">
                    <h1 className="text-3xl font-montserrat font-bold">
                        Customers
                    </h1>
                    <button
                        onClick={() => {
                            if (!token) {
                                alert("Please log in to add a customer");
                                window.location.href = "/";
                            } else {
                                window.location.href =
                                    "/dashboard/add-customer";
                            }
                        }}
                        className="bg-blue-600 hover:scale-105 transform duration-300 text-white text-center font-bold py-2 px-4 rounded-md"
                    >
                        Add Customer +
                    </button>
                </div>

                {/* Filter Inputs */}
                <div className="flex flex-row justify-between space-x-4 py-2 w-full">
                    <input
                        type="text"
                        placeholder="Search ( Full Name, Phone Number, Email )"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="flex-1 border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                    />
                    {/* <input
                        type="text"
                        placeholder="Full Name"
                        value={filters.fullName}
                        onChange={(e) =>
                            setFilters({ ...filters, fullName: e.target.value })
                        }
                        className="flex-1 border p-2 mr-2"
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
                        className="flex-1 border p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) =>
                            setFilters({ ...filters, email: e.target.value })
                        }
                        className="flex-1 border p-2 mr-2"
                    /> */}
                    <select
                        id="gender"
                        className="flex-1 max-w-[12rem] border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                        required
                        value={filters.gender}
                        onChange={(e) =>
                            setFilters({ ...filters, gender: e.target.value })
                        }
                    >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="PreferNotToSay">
                            Prefer Not to Say
                        </option>
                    </select>
                    <input
                        type="number"
                        placeholder="Year of Birth"
                        value={filters.dateOfBirth}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                dateOfBirth: e.target.value,
                            })
                        }
                        className="flex-1 max-w-[12rem] border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                        min={1900}
                        max={2024}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:scale-105 transform duration-300 text-white text-center font-bold py-2 px-4 rounded-md"
                    >
                        Search
                    </button>
                </div>

                <div>
                    <div className="w-full bg-zinc-100 font-montserrat text-[16px] font-medium pl-4 pr-20 py-2">
                        <div className="flex justify-between font-extrabold text-left">
                            <div className="flex-[0.2] text-left">
                                Full Name
                            </div>
                            <div className="flex-[0.15] text-left">
                                Phone Number
                            </div>
                            <div className="flex-[0.25] text-left">Email</div>
                            <div className="flex-[0.1] text-left">Gender</div>
                            <div className="flex-[0.2] text-left">
                                Date of Birth
                            </div>
                        </div>
                    </div>
                </div>

                {currentCustomers.map((customer) => (
                    <CustomerCard key={customer.id} customer={customer} />
                ))}

                {/* Pagination Controls */}
                <div className="flex justify-between items-center py-2">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="bg-blue-600 hover:scale-105 transform duration-300 text-white font-bold py-2 px-4 rounded-md mr-2"
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
                        className="bg-blue-600 hover:scale-105 transform duration-300 text-white font-bold py-2 px-4 rounded-md ml-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
