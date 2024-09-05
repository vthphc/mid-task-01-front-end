import React from "react";
import reddotIcon from "../assets/icons/reddot.png";
import greendotIcon from "../assets/icons/greendot.png";

interface UserCardProps {
    user: {
        id: number;
        username: string;
        password: string;
        role: string;
        isBanned: number;
    };
}

export default function UserCard({ user }: UserCardProps) {
    const token = localStorage.getItem("token");

    const handleBan = async () => {
        if (!token) {
            return;
        } else {
            const isConfirmed = window.confirm(
                "Are you sure you want to ban this user?"
            );

            if (!isConfirmed) {
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:5000/users/ban/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 421) {
                    alert("You can not ban yourself");
                    throw new Error("You can not ban yourself");
                }

                if (!response.ok) {
                    throw new Error("Failed to ban user");
                }

                window.location.reload();
            } catch (error) {
                console.error("Failed to ban user:", error);
            }
        }
    };

    const handleUnban = async () => {
        if (!token) {
            return;
        } else {
            const isConfirmed = window.confirm(
                "Are you sure you want to unban this user?"
            );

            if (!isConfirmed) {
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:5000/users/unban/${user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to unban user");
                }

                window.location.reload();
            } catch (error) {
                console.error("Failed to unban user:", error);
            }
        }
    };

    return (
        <div className="w-full flex hover:bg-zinc-200 transform duration-300 hover:cursor-default items-center justify-between bg-zinc-100 font-montserrat text-[16px] font-medium px-4 py-1">
            <div className="flex items-center justify-between w-full text-left">
                <div
                    className={`flex-[0.2] text-left ${
                        user.isBanned ? `text-black` : `text-black`
                    }`}
                >
                    {user.username}
                </div>
                <div
                    className={`flex-[0.15] text-left ${
                        user.isBanned ? `text-black` : `text-black`
                    }`}
                >
                    {user.role}
                </div>
                <div
                    className={`flex-[0.15] flex flex-row space-x-2 items-center text-left ${
                        user.isBanned ? `text-black` : `text-black`
                    }`}
                >
                    {
                        user.isBanned ? (
                            <img
                                src={reddotIcon}
                                alt="dot-icon"
                                className="w-5 h-5"
                            />
                        ) : (
                            <img
                                src={greendotIcon}
                                alt="dot-icon"
                                className="w-5 h-5"
                            />
                        )
                    }
                    <span>{user.isBanned ? "Banned" : "Active"}</span>
                </div>
                <div className="flex-[0.15] text-right">
                    {user.isBanned ? (
                        <button
                            onClick={handleUnban}
                            className="bg-zinc-400 w-[6rem] flex-1 text-white px-2 py-1 rounded-md"
                        >
                            Unban
                        </button>
                    ) : (
                        <button
                            onClick={handleBan}
                            className="bg-red-500 w-[6rem] flex-1 text-white px-2 py-1 rounded-md"
                        >
                            Ban
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
