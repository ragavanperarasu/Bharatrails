const aedes = require("aedes")();
const net = require("net");
const MqttModel = require("./model/mqttModel");
const productModel = require("./model/prodmodel");

// MQTT Broker Port
const mqttPort = 1883;

// Create TCP MQTT Server
const mqttServer = net.createServer(aedes.handle);

mqttServer.listen(mqttPort, () => {
  console.log("📡 MQTT Broker running on port", mqttPort);
});

// Track online devices
//let onlineDevices = new Set();

// When device connects
// aedes.on("client", (client) => {
//   const deviceId = client ? client.id : "unknown";
//   console.log("🔌 Client Connected:", deviceId);

//   onlineDevices.add(deviceId);
//   console.log("📶 Online Devices:", Array.from(onlineDevices));
// });

// When device disconnects
// aedes.on("clientDisconnect", (client) => {
//   const deviceId = client ? client.id : "unknown";
//   console.log("❌ Client Disconnected:", deviceId);

//   onlineDevices.delete(deviceId);
//   console.log("📶 Online Devices:", Array.from(onlineDevices));
// });

// When MQTT message received
// aedes.on("publish", (packet, client) => {
//   if (!client || !packet.topic) return;

//   const topic = packet.topic;
//   const msg = packet.payload.toString();
//   const device = client.id;

//   console.log(`📥 MQTT Message from ${device}: ${topic} → ${msg}`);
// });

aedes.on("publish", async (packet, client) => {
  if (!client) return;

  const topic = packet.topic;
  let payload;

  try {
    payload = JSON.parse(packet.payload.toString());
  } catch (err) {
    console.log("❌ Invalid JSON");
    return;
  }

  try {
    // =========================
    // Topic 1: train/data
    // =========================
    if (topic === "train/data") {
      const {
        coachid,
        pribat,
        backbat,
        pripow,
        maintainance,
        lat,
        lng,
        sig,
      } = payload;

      if (!coachid || !pribat) return;

      await productModel.create({
        coachid,
        pribat,
        backbat,
        pripow,
        maintainance,
        lat,
        lng,
        sig
      });

      //console.log("✅ Stored train/data");

    }

    // =========================
    // Topic 2: loratrain/data
    // =========================
    else if (topic === "loratrain/data") {
      const { data, sig, mlat, mlon } = payload;
      if (!data) return;

      let [
        coachid,
        pribat,
        backbat,
        pripow,
        maintainance,
        lat,
        lng
      ] = data.split("|");

      if (!coachid || !pribat || !backbat || !pripow || !maintainance) return;


     const d =  await productModel.create({
        coachid,
        pribat,
        backbat,
        pripow,
        maintainance,
        lat: lat,
        lng: lng,
        mlat: mlat,
        mlng: mlon,
        sig
      });
      // console.log("inserted : ", d)

      // console.log("✅ Stored loratrain/data");
    }

    // =========================
    // Ignore other topics
    // =========================
    else {
      return;
    }

  } catch (err) {
    console.log("❌ DB Error:", err.message);
  }
});