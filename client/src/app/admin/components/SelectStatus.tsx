"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderStatus = "pending" | "delivered" | "canceled";

interface StatusSelectProps {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return " border-green-600";
      case "pending":
        return "border-yellow-600";
      case "canceled":
        return " border-red-600";
      default:
        return "text-gray-500 border-gray-300";
    }
  };

  return (
    <Select value={value} onValueChange={(val) => onChange(val as OrderStatus)}>
      <SelectTrigger
        className={`w-[130px] rounded-full border ${getStatusClass(value)}`}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
        <SelectItem value="canceled">Canceled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
