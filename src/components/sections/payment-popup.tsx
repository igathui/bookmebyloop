"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentPopup({ open, onOpenChange }: PaymentPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground py-8 text-center">
          payments interface here
        </div>
      </DialogContent>
    </Dialog>
  );
}
