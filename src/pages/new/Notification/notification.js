import React, { useState, useEffect } from "react";

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Automatically hide the notification after a certain time (e.g., 3 seconds)
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    isVisible && (
      <div className="notification">
        {message}
      </div>
    )
  );
};

export default Notification;
