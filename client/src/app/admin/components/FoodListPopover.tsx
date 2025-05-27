import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

type Food = { name: string; image: string };

export const FoodListPopover = ({ foods }: { foods: Food[] }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {foods.length} foods
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <ul className="space-y-2">
          {foods.map((food, index) => (
            <li key={index} className="flex items-center gap-2">
              <img
                src={food.image}
                alt={food.name}
                className="w-8 h-8 rounded"
              />
              <span>{food.name}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default FoodListPopover;
