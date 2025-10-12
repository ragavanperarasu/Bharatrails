const productModel = require('../model/prodmodel');

module.exports = (io) => {
  io.on("connection", (socket) => {
    //console.log("⚡ User connected:", socket.id);

    // Send data every 60 seconds
    const interval = setInterval(async () => {
      try {
        const products = await productModel.find({});
        //console.log('data send', products);
        socket.emit("productData", products);
      } catch (err) {
        socket.emit("error", { message: "Error fetching data" });
      }
    }, 60000); // 60000ms = 60 seconds

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      clearInterval(interval); // stop interval when client disconnects
    });
  });
};
