import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },
        isVisible: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
