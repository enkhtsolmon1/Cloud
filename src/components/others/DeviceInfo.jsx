import React, { useState, useEffect } from "react";

const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    // Төхөөрөмжийн мэдээллийг цуглуулах
    const userAgent = window.navigator.userAgent; // Хэрэглэгчийн agent
    const platform = window.navigator.platform; // Төхөөрөмжийн платформ
    const screenWidth = window.screen.width; // Дэлгэцийн өргөн
    const screenHeight = window.screen.height; // Дэлгэцийн өндөр
    const language = window.navigator.language; // Хэлний тохиргоо
    const onlineStatus = window.navigator.onLine ? "Онлайн" : "Офлайн"; // Сүлжээний статус

    setDeviceInfo({
      userAgent,
      platform,
      screenWidth,
      screenHeight,
      language,
      onlineStatus,
    });
  }, []);

  return (
    <div>
      <h2>Төхөөрөмжийн мэдээлэл</h2>
      <ul>
        <li>
          <strong>Хэрэглэгчийн agent:</strong> {deviceInfo.userAgent}
        </li>
        <li>
          <strong>Платформ:</strong> {deviceInfo.platform}
        </li>
        <li>
          <strong>Дэлгэцийн хэмжээ:</strong> {deviceInfo.screenWidth} x{" "}
          {deviceInfo.screenHeight}
        </li>
        <li>
          <strong>Хэлний тохиргоо:</strong> {deviceInfo.language}
        </li>
        <li>
          <strong>Сүлжээний статус:</strong> {deviceInfo.onlineStatus}
        </li>
      </ul>
    </div>
  );
};

export default DeviceInfo;
