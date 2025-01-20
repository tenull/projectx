import mongoose from 'mongoose';

const connectToDatabase = async () => {
	try {
		mongoose.set('strictQuery', false);
		const connect = await mongoose.connect('mongodb+srv://tamas:L!123456@cluster0.5xkjv.mongodb.net/laskoditeszta', {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`MongoDb Connected: ${connect.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
};

export default connectToDatabase;
