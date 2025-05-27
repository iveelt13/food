import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type OrderStatus = "pending" | "delivered" | "canceled";

export const StatusChangeDialog = ({
  open,
  onOpenChange,
  selected,
  onSave,
  statusChange,
  setStatusChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: string[];
  onSave: () => void;
  statusChange: OrderStatus | "";
  setStatusChange: (status: OrderStatus | "") => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Change delivery state
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-3 my-4">
          {(["delivered", "pending", "canceled"] as OrderStatus[]).map(
            (status) => (
              <Button
                key={status}
                variant={statusChange === status ? "default" : "outline"}
                className={`rounded-full ${
                  status === "delivered"
                    ? "text-green-500 border-green-500"
                    : status === "pending"
                    ? "text-yellow-600 border-yellow-600"
                    : "text-red-600 border-red-600"
                }`}
                onClick={() => setStatusChange(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            )
          )}
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            disabled={!statusChange}
            onClick={onSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
