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
                        <div className="flex flex-col space-y-8">
                            <a
                                href="/dashboard/customers"
                                className="font-montserrat text-white text-[18px] font-bold"
                            >
                                Customers
                            </a>
                            <a
                                href="/settings"
                                className="font-montserrat text-white text-[18px] font-bold"
                            >
                                Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between pb-4">
                <span className="text-white text-[18px] font-montserrat font-bold">
                    Hi, {user.username}!
                </span>
                <div className="hover:cursor-pointer" onClick={handleLogout}>
                    <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
