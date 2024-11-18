import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import dayjs from "dayjs";
import { NotificationContext } from "../NotificationContext";



//composant pour afficher les notifications sous forme de tableau
const NotificationsTable = () => {
    const { notifications, markAsRead } = useContext(NotificationContext);

    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table aria-label="notifications table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Message</strong></TableCell>
                        <TableCell><strong>Date/Heure</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <TableRow key={index}>
                                <TableCell>{notification.message}</TableCell>
                                <TableCell>
                                    {dayjs(notification.timestamp).format("DD MMM YYYY à HH:mm")}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        className={notification.isRead ? "btn-read" : "btn-unread"}
                                        size="small"
                                        onClick={() => markAsRead(notification.id, !notification.isRead)}
                                    >
                                        {notification.isRead ? "Non lue" : "Lue"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Pas de nouvelles notifications
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default NotificationsTable;
