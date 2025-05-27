"use client";

import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { StatusChangeDialog } from "./components";
import { Checkbox } from "@/components/ui/checkbox";
import StatusSelect from "./components/SelectStatus";
import FoodListPopover from "./components/FoodListPopover";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus = "pending" | "delivered" | "canceled";

type Food = {
  name: string;
  image: string;
};

type Order = {
  id: number;
  customerEmail: string;
  foods: Food[];
  date: string;
  totalPrice: number;
  address: string;
  status: OrderStatus;
};

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios("http://localhost:8000/food-order");
      const data = await res.data;

      const transformedOrders: Order[] = data.orders.map((order: any) => ({
        id: order._id,
        customerEmail: order.user.email,
        address: order.user.address || "N/A",
        date: order.createdAt,
        totalPrice: order.totalPrice,
        status: order.status.toLowerCase(), // Convert "PENDING" → "pending"
        foods: order.foodOrderItems.map((item: any) => ({
          name: item.food.foodName,
          image: item.food.image,
        })),
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  fetchOrders();
}, []);

const dummyOrders: Order[] = [
  {
    id: 1,
    customerEmail: "user1@example.com",
    foods: [
      { name: "Pizza", image: "/pizza.jpg" },
      { name: "Burger", image: "/burger.jpg" },
    ],
    date: "2025-05-20",
    totalPrice: 32.5,
    address: "123 Main St",
    status: "pending",
  },
  {
    id: 2,
    customerEmail: "user2@example.com",
    foods: [{ name: "Sushi", image: "/sushi.jpg" }],
    date: "2025-05-21",
    totalPrice: 18.0,
    address: "456 Elm St",
    status: "delivered",
  },
];

export const TestDashboard = () => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [statusEditOpen, setStatusEditOpen] = useState(false);
  const [statusChange, setStatusChange] = useState<OrderStatus | "">("");

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-05-01"),
    to: new Date("2025-05-31"),
  });

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, id] : prev.filter((orderId) => orderId !== id)
    );
  };

  const handleStatusChange = (id: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const orderDate = new Date(order.date);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  return (
    <div className="p-6 space-y-4 border border-[#E4E4E7] bg-white rounded-lg w-290">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm text-gray-500">{orders.length} items</p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange value={dateRange} onChange={setDateRange} />

          <StatusChangeDialog
            open={statusEditOpen}
            onOpenChange={setStatusEditOpen}
            selected={selectedOrders}
            onSave={() => {
              setOrders((prev) =>
                prev.map((order) =>
                  selectedOrders.includes(order.id)
                    ? { ...order, status: statusChange as OrderStatus }
                    : order
                )
              );
              setSelectedOrders([]);
              setStatusEditOpen(false);
              setStatusChange("");
            }}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
          />

          <Button
            className="border rounded-full "
            disabled={selectedOrders.length === 0}
            onClick={() => setStatusEditOpen((prev) => !prev)}
          >
            Change delivery state
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                className="border border-black"
                checked={selectedOrders.length === orders.length}
                onCheckedChange={(checked) =>
                  setSelectedOrders(
                    checked ? orders.map((order) => order.id) : []
                  )
                }
              />
            </TableHead>
            <TableHead>#</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Foods</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox
                  className="border border-black"
                  checked={selectedOrders.includes(order.id)}
                  onCheckedChange={(checked) =>
                    handleSelect(order.id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.customerEmail}</TableCell>
              <TableCell>
                <FoodListPopover foods={order.foods} />
              </TableCell>
              <TableCell>
                {format(new Date(order.date), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <StatusSelect
                  value={order.status}
                  onChange={(newStatus) =>
                    handleStatusChange(order.id, newStatus)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestDashboard;

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/food-order");
      const setOrderData = res.data;
      console.log("Fetched orders:", setOrderData);
      const transformedOrders: Order[] = setOrderData.orders.map(
        (order: any) => ({
          id: order._id,
          customerEmail: order.user.email,
          address: order.user.address || "N/A",
          date: order.createdAt,
          totalPrice: order.totalPrice,
          status: order.status.toLowerCase(),
          foods: order.foodOrderItems.map((item: any) => ({
            name: item.food.foodName,
            image: item.food.image,
          })),
        })
      );
      setOrders(transformedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };
  fetchOrders();
}, []);
