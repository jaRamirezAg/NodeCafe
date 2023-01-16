import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.MONGOBD_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos creada");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de crear la BD");
  }
};

export default dbConnection;
