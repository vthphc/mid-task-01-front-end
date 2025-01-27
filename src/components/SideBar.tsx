import React from "react";
import logoutIcon from "../assets/icons/logout.png";

interface User {
    username: string;
    password: string;
    role: string;
}

export default function SideBar() {
    const [user, setUser] = React.useState<User>({
        username: "",
        password: "",
        role: "",
    });

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
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const [selected, setSelected] = React.useState("Dashboard");
    const page = window.location.pathname;

    return (
        <div className="w-[16rem] fixed flex flex-col justify-between h-screen px-8 py-4 bg-black">
            <div className="flex flex-col space-y-12">
                <div
                    onClick={() => {
                        window.location.href = "/dashboard";
                    }}
                    className="flex hover:cursor-pointer items-center w-full"
                >
                    <h1 className="font-extrabold text-white text-3xl mx-auto pt-2 mb-2 mt-2">
                        Management
                    </h1>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="/dashboard/customers"
                                className={`font-montserrat p-4 ${
                                    page === "/dashboard/customers" ||
                                    page === "/dashboard/add-customer" ||
                                    page === "/dashboard/edit-customer/*"
                                        ? `bg-white text-black`
                                        : `bg-black text-white hover:bg-zinc-800 hover:scale-105`
                                } [18px] font-bold rounded-lg transform duration-300`}
                            >
                                Customers
                            </a>
                            <a
                                href="/dashboard/users"
                                className={`font-montserrat p-4 ${
                                    page === "/dashboard/users"
                                        ? `bg-white text-black`
                                        : `bg-black text-white hover:bg-zinc-800 hover:scale-105`
                                } [18px] font-bold rounded-lg transform duration-300`}
                            >
                                Users
                            </a>
                            <a
                                href="/settings"
                                className={`font-montserrat p-4 ${
                                    page === "/settings" ||
                                    page === "/settings/change-password"
                                        ? `bg-white text-black`
                                        : `bg-black text-white hover:bg-zinc-800 hover:scale-105`
                                } [18px] font-bold rounded-lg transform duration-300`}
                            >
                                Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between pb-4">
                {token ? (
                    <div className="flex flex-row justify-between w-full items-center">
                        <span className="text-white text-[18px] hover:cursor-default font-montserrat font-bold">
                            Hi, {user.username}!
                        </span>
                        <div
                            className="hover:cursor-pointer hover:scale-105 transform duration-300"
                            onClick={handleLogout}
                        >
                            <img
                                src={logoutIcon}
                                alt="Logout"
                                className="w-6 h-6"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row w-full items-center">
                        <button
                            onClick={() => {
                                window.location.href = "/";
                            }}
                            className="bg-blue-600 w-full hover:scale-105 transform duration-300 text-white text-center font-bold py-2 px-4 rounded-md"
                        >
                            Login / Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
