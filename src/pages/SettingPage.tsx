import React from "react";
import SideBar from "../components/SideBar";

interface User {
    username: string;
    password: string;
    role: string;
}

export default function SettingPage() {
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

    return (
        <div className="flex flex-row bg-zinc-100 h-screen">
            <SideBar />
            <div className="py-8 ml-64 w-full space-y-4 px-8">
                <h1 className="text-3xl font-montserrat font-bold">Settings</h1>
                <div className="flex flex-col h-[32rem] bg-white rounded-3xl justify-center items-center w-full space-y-8">
                    <div className="flex flex-col space-y-4">
                        <div className="flex-1 flex flex-col w-[20rem]">
                            <label className="text-lg font-montserrat font-semibold">
                                Username
                            </label>
                            <input
                                type="text"
                                value={user.username}
                                className="border p-2 font-montserrat"
                                disabled
                            />
                        </div>
                        <div className="flex-1 flex flex-col w-[20rem]">
                            <label className="text-lg font-montserrat font-semibold">
                                Role
                            </label>
                            <input
                                type="text"
                                value={user.role}
                                className="border p-2 font-montserrat"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 w-[20rem]">
                        <button
                            onClick={() => {
                                if (!token) {
                                    alert("Please login first");
                                    return;
                                } else {
                                    window.location.href =
                                        "/settings/change-password";
                                }
                            }}
                            className="w-full transform duration-300 hover:scale-105 bg-blue-600 text-white font-montserrat text-[14px] font-bold p-4"
                        >
                            Change Password
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }}
                            className="w-full transform duration-300 hover:scale-105 bg-red-600 text-white font-montserrat text-[14px] font-bold p-4"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
