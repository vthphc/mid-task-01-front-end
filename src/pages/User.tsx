import React from "react";
import SideBar from "../components/SideBar";
import UserCard from "../components/UserCard";

interface User {
    id: number;
    username: string;
    password: string;
    role: string;
    isBanned: number;
}

const USERS_PER_PAGE = 10;

export default function User() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [usernameFilter, setUsernameFilter] = React.useState("");
    const [roleFilter, setRoleFilter] = React.useState("");
    const [isBannedFilter, setIsBannedFilter] = React.useState("");

    const token = localStorage.getItem("token");

    React.useEffect(() => {
        if (!token) {
            return;
        } else {
            const fetchUsers = async () => {
                try {
                    const response = await fetch("http://localhost:5000/users");

                    if (!response.ok) {
                        throw new Error("Failed to fetch users");
                    }

                    setUsers(await response.json());
                } catch (error) {
                    console.error("Failed to fetch users:", error);
                }
            };

            fetchUsers();
        }
    }, []);

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

    const filteredUsers = users.filter((user) => {
        const usernameMatch = user.username
            .toLowerCase()
            .includes(usernameFilter.toLowerCase());
        const roleMatch = roleFilter ? user.role === roleFilter : true;
        const isBannedMatch =
            isBannedFilter === "true"
                ? user.isBanned === 1
                : isBannedFilter === "false"
                ? user.isBanned === 0
                : true;

        return usernameMatch && roleMatch && isBannedMatch;
    });

    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="py-4 ml-64 w-full space-y-1 px-8">
                <div className="flex items-center flex-row justify-between">
                    <h1 className="text-3xl font-montserrat font-bold">
                        Users
                    </h1>
                </div>

                {/* Filter Section */}
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        value={usernameFilter}
                        onChange={(e) => setUsernameFilter(e.target.value)}
                        placeholder="Search by username"
                        className="flex-[0.3] border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                    />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="flex-[0.25] border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                    </select>
                    <select
                        value={isBannedFilter}
                        onChange={(e) => setIsBannedFilter(e.target.value)}
                        className="flex-[0.15] border-2 p-2 mr-2 trasnfom duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                    >
                        <option value="">All Statuses</option>
                        <option value="true">Banned</option>
                        <option value="false">Active</option>
                    </select>
                </div>

                <div className="pt-2">
                    <div className="w-full bg-zinc-100 font-montserrat text-[16px] font-medium pl-4 pr-8 py-2">
                        <div className="flex justify-between font-extrabold text-left">
                            <div className="flex-[0.2] text-left">Username</div>
                            <div className="flex-[0.15] text-left">Role</div>
                            <div className="flex-[0.1] text-left">Status</div>
                            <div className="flex-[0.15] text-right">
                                Actions
                            </div>
                        </div>
                    </div>
                </div>
                {displayedUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}

                {/* Pagination controls */}
                <div className="flex justify-between space-x-4 pt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 bg-blue-600 text-white font-bold rounded transform duration-300 hover:scale-105 ${
                            currentPage === 1 && "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 bg-blue-600 text-white font-bold rounded transform duration-300 hover:scale-105 ${
                            currentPage === totalPages &&
                            "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
