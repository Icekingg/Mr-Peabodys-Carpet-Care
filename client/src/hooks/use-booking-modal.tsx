import { createContext, useContext, useState, type ReactNode } from "react";

interface BookingModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BookingModalContext = createContext<BookingModalContextType>({
  open: false,
  setOpen: () => {},
});

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingModalContext.Provider value={{ open, setOpen }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  return useContext(BookingModalContext);
}
