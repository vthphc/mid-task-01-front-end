import React from "react";
import editIcon from "../assets/icons/editing.png";
import deleteIcon from "../assets/icons/delete.png";
import maleIcon from "../assets/icons/male.png";
import femaleIcon from "../assets/icons/female.png";

interface Customer {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
}

export default function CustomerCard({ customer }: { customer: Customer }) {
    function formatDate(date: Date) {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const handleDelete = async () => {
        console.log("Delete customer:", customer.id);
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/customers/${customer.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete customer");
            }

            alert("Customer deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete customer:", error);
        }
    };

    const handleEdit = () => {
        window.location.href = `/dashboard/edit-customer/${customer.id}`;
    };

    const genderIcon = customer.gender === "Male" ? maleIcon : femaleIcon;

    return (
        <div className="w-full flex hover:bg-zinc-200 transform duration-300 hover:cursor-default items-center justify-between bg-zinc-100 font-montserrat text-[16px] font-medium px-4 py-2">
            <div className="flex items-center justify-between w-full text-left">
                <div className="flex-[0.2] text-left">{customer.fullName}</div>
                <div className="flex-[0.15] text-left">
                    {customer.phoneNumber}
                </div>
                <div className="flex-[0.25] text-left">{customer.email}</div>
                <div className="flex-[0.1] flex text-left items-center space-x-2">
                    <img
                        src={genderIcon}
                        alt="gender-icon"
                        className="w-5 h-5"
                    />
                    <span>{customer.gender}</span>
                </div>
                <div className="flex-[0.2] text-left">
                    {formatDate(customer.dateOfBirth)}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-center space-x-4">
                    <div
                        onClick={handleEdit}
                        className="hover:cursor-pointer hover:scale-110 transform duration-300"
                    >
                        <img src={editIcon} alt="edit" className="w-6 h-6" />
                    </div>
                    <div
                        onClick={handleDelete}
                        className="hover:cursor-pointer hover:scale-110 transform duration-300"
                    >
                        <img
                            src={deleteIcon}
                            alt="delete"
                            className="w-6 h-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
