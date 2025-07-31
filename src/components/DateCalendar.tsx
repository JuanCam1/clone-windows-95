import { useEffect, useState } from "react";
import logo from "../assets/images/calendar-1.png";

const DateCalendar = () => {
  const [date, setDate] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDate(newDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="ml-auto inline-block border border-t-zinc-900 border-l-zinc-900 border-b-white border-r-white w-[130px]">
      <div className="border border-t-[#808080] border-l-[#808080] border-b-[#dcdcdc] border-r-[#dcdcdc] bg-[#c0c0c0] px-2 h-7 text-sm font-bold text-black flex items-center gap-3">
        <img src={logo} alt="logo" className="w-4 h-4" />
        {date}
      </div>
    </div>
  );
};
export default DateCalendar;
