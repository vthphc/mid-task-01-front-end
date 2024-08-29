import React from "react";
import editIcon from "../assets/icons/editing.png";
import deleteIcon from "../assets/icons/delete.png";

interface Customer {
    _id: string;
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
        console.log("Delete customer:", customer._id);
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/customers/${customer._id}`,
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
        window.location.href = `/dashboard/edit-customer/${customer._id}`;
    };

    return (
        <div className="w-full flex items-center justify-between bg-zinc-100 font-montserrat text-[16px] font-medium px-4 py-4">
            <div className="flex items-center justify-between w-full text-left">
                <div className="flex-1 text-center">{customer.fullName}</div>
                <div className="flex-1 text-center">{customer.phoneNumber}</div>
                <div className="flex-1 text-center">{customer.email}</div>
                <div className="flex-1 text-center">{customer.gender}</div>
                <div className="flex-1 text-center">
                    {formatDate(customer.dateOfBirth)}
                </div>
            </div>
            <div>
                <div className="flex items-center justify-center space-x-4">
                    <div onClick={handleEdit} className="hover:cursor-pointer">
                        <img src={editIcon} alt="edit" className="w-6 h-6" />
                    </div>
                    <div
                        onClick={handleDelete}
                        className="hover:cursor-pointer"
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
