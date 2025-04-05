import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Textarea, Switch, Box, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { fetchNotification,updateNotification } from '../../redux/actions/notificationActions';

const AdminNotification = () => {
    const dispatch = useDispatch();
    const { message, isVisible, loading } = useSelector((state) => state.notification);
    const [newMessage, setNewMessage] = useState('');
    const [newIsVisible, setNewIsVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchNotification());
    }, [dispatch,isVisible]);

    useEffect(() => {
        if (message && typeof message === 'object' && message.message) {
            setNewMessage(message.message);
        } else {
            setNewMessage('');
        }
        setNewIsVisible(isVisible || false);
    }, [message, isVisible]);

    const handleUpdate = () => {
        dispatch(updateNotification(newMessage, newIsVisible));
    };

    return (
        <Box p={5}>
            <Text textAlign="center">
                <div dangerouslySetInnerHTML={{ __html: newMessage }} />
            </Text>
            <FormControl>
                <FormLabel>Értesítés szövege:</FormLabel>
                <Textarea 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt={4}>
                <FormLabel htmlFor="visibility">Látható:</FormLabel>
                <Switch 
                    id="visibility" 
                    
                    onChange={() => setNewIsVisible(!newIsVisible)} 
                    isChecked={newIsVisible} 
                />
            </FormControl>
            <Button colorScheme="blue" mt={4} onClick={handleUpdate} isLoading={loading}>
                Mentés
            </Button>
        </Box>
    );
};

export default AdminNotification;
