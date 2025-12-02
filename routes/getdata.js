const productModel = require('../model/prodmodel');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    const sendData = async () => {
      try {
        const products = await productModel.find({});
        socket.emit("productData", products);
      } catch (err) {
        socket.emit("error", { message: "Error fetching data" });
      }
    };

    sendData();

    const interval = setInterval(sendData, 20000);

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      clearInterval(interval);
    });
  });
};
