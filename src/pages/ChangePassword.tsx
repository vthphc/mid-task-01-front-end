import React from "react";
import SideBar from "../components/SideBar";

export default function ChangePassword() {
    const [user, setUser] = React.useState({
        username: "",
        password: "",
        role: "",
    });

    const [currentPassword, setCurrentPassword] = React.useState("");
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] =
        React.useState(true);
    const [newPassword, setNewPassword] = React.useState("");
    const [isNewPasswordValid, setIsNewPasswordValid] = React.useState(true);
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
        React.useState(true);

    const token = localStorage.getItem("token");

    const validateCurrentPassword = () => {
        if (currentPassword.includes(" ")) {
            setIsCurrentPasswordValid(false);
            return false;
        }

        setIsCurrentPasswordValid(true);
        return true;
    };

    const validateNewPassword = () => {
        if (newPassword.length < 8) {
            setIsNewPasswordValid(false);
            return false;
        }

        setIsNewPasswordValid(true);
        return true;
    };

    const validateConfirmNewPassword = () => {
        if (confirmNewPassword !== newPassword) {
            setIsConfirmPasswordValid(false);
            return false;
        }

        setIsConfirmPasswordValid(true);
        return true;
    };

    const handleSaveChange = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (!validateCurrentPassword()) {
            return;
        }

        if (!validateNewPassword()) {
            return;
        }

        if (!validateConfirmNewPassword()) {
            return;
        }

        try {
            if (token) {
                const response = await fetch(
                    "http://localhost:5000/auth/change-password",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            oldPassword: currentPassword,
                            newPassword: confirmNewPassword,
                        }),
                    }
                );

                if (response.status === 400) {
                    setIsCurrentPasswordValid(false);
                    return;
                } else {
                    setIsCurrentPasswordValid(true);
                }

                if (!response.ok) {
                    throw new Error("Failed to change password");
                }

                alert("Password changed successfully");
                window.location.href = "/settings";
            }
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };

    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="py-8 ml-64 w-full space-y-4 px-8">
                <h1 className="text-3xl font-montserrat font-bold">Settings</h1>
                <div className="flex flex-col items-center w-full space-y-8">
                    <div className="flex flex-col space-y-4">
                        <div className="flex-1 flex flex-col w-[20rem]">
                            <label className="text-lg font-montserrat font-semibold">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="border p-2 font-montserrat"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                            {!isCurrentPasswordValid && (
                                <span className="text-red-500 font-montserrat text-sm">
                                    Incorrect password
                                </span>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col w-[20rem]">
                            <label className="text-lg font-montserrat font-semibold">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="border p-2 font-montserrat"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {!isNewPasswordValid && (
                                <span className="text-red-500 font-montserrat text-sm">
                                    Password must be at least 8 characters
                                </span>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col w-[20rem]">
                            <label className="text-lg font-montserrat font-semibold">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="border p-2 font-montserrat"
                                value={confirmNewPassword}
                                onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                }
                            />
                            {!isConfirmPasswordValid && (
                                <span className="text-red-500 font-montserrat text-sm">
                                    Invalid confirm password
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleSaveChange}
                            className="w-full bg-blue-600 text-white font-montserrat text-[14px] font-light p-4"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
