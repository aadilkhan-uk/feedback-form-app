"use client";

import { useMemo, useState } from "react";
import { format, subDays } from "date-fns";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
  defaultDaysBack?: number;
}

export function DateRangePicker({
  onDateRangeChange,
  defaultDaysBack = 30,
}: DateRangePickerProps) {
  const defaultEndDate = useMemo(() => {
    return format(new Date(), "yyyy-MM-dd");
  }, []);

  const defaultStartDate = useMemo(() => {
    return format(subDays(new Date(), defaultDaysBack), "yyyy-MM-dd");
  }, [defaultDaysBack]);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    onDateRangeChange(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    onDateRangeChange(startDate, value);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleStartDateChange(e.target.value)}
        max={endDate}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:w-auto"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleEndDateChange(e.target.value)}
        min={startDate}
        max={defaultEndDate}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:w-auto"
      />
    </div>
  );
}
