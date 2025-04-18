import React, { useState, useEffect } from "react";

import { useAuth } from "../Context/AuthContext";

const CountdownWithCooldown = ({ targetDate, isCooldown, setIsCooldown }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsCooldown(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full text-center ">
      {isCooldown ? (
        <div className="w-full">
          <div className="flex items-start justify-center w-full gap-4 count-down-main ">
            <div className="timer w-16">
              <div className=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element days font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.days}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-medium text-gray-900 dark:text-white  mt-1 text-center w-full">
                өдөр
              </p>
            </div>
            <h3 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white  mt-3">
              :
            </h3>
            <div className="timer w-16">
              <div className=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element hours font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.hours}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 dark:text-white  mt-1 text-center w-full">
                цаг
              </p>
            </div>
            <h3 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white  mt-3">
              :
            </h3>
            <div className="timer w-16">
              <div className=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden">
                <h3 className="countdown-element minutes font-Cormorant font-semibold text-2xl text-white text-center">
                  {timeLeft.minutes}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 dark:text-white  mt-1 text-center w-full">
                минут
              </p>
            </div>
            <h3 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white  mt-3">
              :
            </h3>
            <div className="timer w-16">
              <div className=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden ">
                <h3 className="countdown-element seconds font-Cormorant font-semibold text-2xl text-white text-center animate-countinsecond">
                  {timeLeft.seconds}
                </h3>
              </div>
              <p className="text-lg font-Cormorant font-normal text-gray-900 dark:text-white  mt-1 text-center w-full">
                секунд
              </p>
            </div>
          </div>

          {/* <p className="text-4xl font-manrope">
            {timeLeft.days} өдөр {timeLeft.hours} цаг {timeLeft.minutes} минут{" "}
            {timeLeft.seconds} секунд
          </p> */}
        </div>
      ) : (
        <p className="text-rose-600 uppercase font-medium text-2xl">
          Хичээл сонголт хаасан
        </p>
      )}
    </div>
  );
};

// Ашиглахдаа:
export default function App({ isCooldown, setIsCooldown }) {
  const { configState } = useAuth();

  return configState.value ? (
    <CountdownWithCooldown
      targetDate={configState?.value}
      isCooldown={isCooldown}
      setIsCooldown={setIsCooldown}
    />
  ) : (
    <div></div>
  );
}
