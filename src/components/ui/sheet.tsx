"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-ink/60 backdrop-blur-[2px]",
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
  }
>(({ className, children, title = "Menu", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-[0_0_60px_rgba(0,0,0,0.25)]",
        "data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right",
        className,
      )}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Site navigation
      </DialogPrimitive.Description>
      <DialogPrimitive.Close
        aria-label="Close menu"
        className="absolute right-5 top-6 z-10 p-2 text-ink transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
      >
        <X className="size-5" strokeWidth={1.5} />
      </DialogPrimitive.Close>
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetOverlay, SheetPortal };
