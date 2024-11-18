import React, { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();


//contexte globale pour gérer les notifications
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Charger le token depuis le localStorage
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Aucun token trouvé dans localStorage");
            return;
        }

        // Etablir la connexion WebSocket
        const websocket = new WebSocket(`ws://localhost:8000/notifications/?token=${token}`);
        setWs(websocket);

        websocket.onmessage = (event) => {
            // Ajouter isRead: false à chaque notification reçue
            const notification = { ...JSON.parse(event.data), isRead: false };
        
            console.log("Nouvelle notification reçue:", notification.message);
        
            // Mettre à jour la liste des notifications avec la nouvelle notification en haut
            setNotifications((prev) => [notification, ...prev]);
        
            // Incrémenter le compteur des notifications non lues uniquement si elles ne sont pas encore marquées comme lues
            setUnreadCount((prev) => prev + 1);
        };
        

        websocket.onerror = (error) => {
            console.error("Erreur WebSocket:", error);
        };

        websocket.onclose = () => {
            console.log("Connexion WebSocket fermée.");
        };

        // Nettoyer la connexion lors du démontage
        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []); // Pas de dépendances nécessaires ici

    // Fonction pour marquer toutes les notifications comme lues
    const markAllAsRead = () => {
        setUnreadCount(0);
    };

    const markAsRead = (id, isRead) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, isRead } : notification
            )
        );
        if (isRead) {
            setUnreadCount((prev) => Math.max(prev - 1, 0)); // Décrémenter les non-lues
        } else {
            setUnreadCount((prev) => prev + 1); // Incrémenter si on marque comme non lue
        }
    };
    
    

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
