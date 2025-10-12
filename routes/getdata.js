const productModel = require('../model/prodmodel');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    // Function to fetch and send data
    const sendData = async () => {
      try {
        const products = await productModel.find({});
        socket.emit("productData", products);
      } catch (err) {
        socket.emit("error", { message: "Error fetching data" });
      }
    };

    // Send data immediately
    sendData();

    // Then send data every 60 seconds
    const interval = setInterval(sendData, 60000);

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      clearInterval(interval);
    });
  });
};
