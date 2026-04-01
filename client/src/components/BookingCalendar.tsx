import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface BookingCalendarProps {
  value: string;
  onChange: (dateStr: string) => void;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDisplay(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const containerRef = useRef<HTMLDivElement>(null);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 2);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const rows: (Date | null)[][] = [];
    let row: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      row.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      row.push(new Date(viewYear, viewMonth, d));
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      while (row.length < 7) row.push(null);
      rows.push(row);
    }

    return rows;
  }, [viewMonth, viewYear]);

  const canPrev = viewYear > minDate.getFullYear() || (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());
  const canNext = viewYear < maxDate.getFullYear() || (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  function prevMonth(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!canPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!canNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDisabled(date: Date) {
    if (date < minDate || date > maxDate) return true;
    if (date.getDay() === 0) return true;
    return false;
  }

  function isSelected(date: Date) {
    return toDateStr(date) === value;
  }

  function isToday(date: Date) {
    return toDateStr(date) === toDateStr(today);
  }

  function handleSelect(date: Date, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onChange(toDateStr(date));
    setOpen(false);
  }

  function toggleCalendar(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={toggleCalendar}
        className={`flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring ${!value ? "text-muted-foreground" : "text-foreground"}`}
        data-testid="button-select-date"
      >
        <CalendarIcon className="w-4 h-4 mr-2 shrink-0" />
        <span className="truncate">{value ? formatDisplay(value) : "Pick a date"}</span>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-[70] rounded-md border border-input bg-popover p-3 shadow-lg select-none"
          data-testid="booking-calendar"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={prevMonth}
              disabled={!canPrev}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:bg-[#4169E1]/20 hover:text-[#4169E1] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
              data-testid="button-prev-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-serif font-normal tracking-wide">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={nextMonth}
              disabled={!canNext}
              className="w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:bg-[#4169E1]/20 hover:text-[#4169E1] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
              data-testid="button-next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <table className="border-collapse">
            <thead>
              <tr>
                {DAYS.map((d) => (
                  <th key={d} className="text-[0.7rem] font-normal text-muted-foreground py-1 w-8 text-center">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cells.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-0.5 text-center">
                      {cell ? (
                        <button
                          type="button"
                          disabled={isDisabled(cell)}
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => handleSelect(cell, e)}
                          data-testid={`calendar-day-${cell.getDate()}`}
                          className={[
                            "w-8 h-8 rounded-md text-sm transition-colors",
                            isSelected(cell)
                              ? "bg-[#4169E1] text-white font-bold"
                              : isToday(cell)
                                ? "border border-[#4169E1]/50 text-foreground"
                                : "text-foreground",
                            isDisabled(cell)
                              ? "opacity-30 cursor-not-allowed"
                              : "cursor-pointer hover:bg-[#4169E1]/20 hover:text-[#4169E1]",
                          ].join(" ")}
                        >
                          {cell.getDate()}
                        </button>
                      ) : (
                        <div className="w-8 h-8" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
