import React, { useState, useEffect } from 'react';

const NotifyPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // setup chat socket
    const notifySocket = new WebSocket(`ws://${window.location.host}/ws/notify/`);

    // on socket open
    notifySocket.onopen = () => {
      console.log('Socket successfully connected.');
    };

    // on socket close
    notifySocket.onclose = () => {
      console.log('Socket closed unexpectedly');
    };

    // on receiving message on group
    notifySocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const message = data.message;

      // Update notifications and count
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setNotificationCount((prevCount) => prevCount + 1);
    };

    // Cleanup WebSocket on component unmount
    return () => notifySocket.close();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Notify
          </a>

          <li className="">
            <a className="nav-link " href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <i id="bellCount" className="fa-solid fa-bell" data-count={notificationCount}></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-wrap" id="notify" style={{ width: '300px' }}>
              {notifications.map((message, index) => (
                <li key={index} className="dropdown-item text-wrap">
                  <a href="#">{message}</a>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </nav>

      {/* Content */}
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Notify</h1>
      </div>
    </>
  );
};

export default NotifyPage;
