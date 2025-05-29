import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { FoodOrderItems } from "../page";

export const FoodListPopover = ({
  foodOrderItems,
}: {
  foodOrderItems: FoodOrderItems[];
}) => {
  console.log("foodsn in props", foodOrderItems);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {foodOrderItems.length} foods
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <ul className="space-y-2">
          {foodOrderItems.map((order, index) => (
            <li key={index} className="flex items-center gap-2">
              <img
                src={order.food.image}
                alt={order.food.foodName}
                className="w-8 h-8 rounded"
              />
              <p>{order.food.foodName}</p>X<p>{order.quantity}</p>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default FoodListPopover;
