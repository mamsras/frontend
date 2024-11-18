import React, { useContext} from "react";
import { Badge } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom"; // Pour la redirection
import "../styles/notification.css";
import { NotificationContext } from "../NotificationContext";

const Notifications = () => {

  const { unreadCount } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/notifications"); // Redirige vers la page de notifications
  };

  return (
    <div className="notification-icon" onClick={handleIconClick}>
      <i className="fas fa-bell"></i>
      {unreadCount > 0 && (
        <Badge pill bg="danger" className="notification-badge">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default Notifications;
