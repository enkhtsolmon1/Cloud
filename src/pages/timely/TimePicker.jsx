import React, { useState } from "react";

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState("");

  const handleChange = (e) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label htmlFor="timePicker" className="text-gray-700 font-medium">
        Select Time
      </label>
      <input
        id="timePicker"
        type="time"
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedTime}
        onChange={handleChange}
        step="900" // 15-minute intervals
      />
      <p className="text-gray-600">Selected Time: {selectedTime || "--:--"}</p>
    </div>
  );
};

export default TimePicker;
