const aedes = require("aedes")();
const net = require("net");
const MqttModel = require("./model/mqttModel");


// MQTT Broker Port
const mqttPort = 1883;

// Create TCP MQTT Server
const mqttServer = net.createServer(aedes.handle);

mqttServer.listen(mqttPort, () => {
    console.log("📡 MQTT Broker running on port", mqttPort);
});

// Track online devices
let onlineDevices = new Set();

// When device connects
aedes.on("client", (client) => {
    const deviceId = client ? client.id : "unknown";
    console.log("🔌 Client Connected:", deviceId);

    onlineDevices.add(deviceId);
    console.log("📶 Online Devices:", Array.from(onlineDevices));
});

// When device disconnects
aedes.on("clientDisconnect", (client) => {
    const deviceId = client ? client.id : "unknown";
    console.log("❌ Client Disconnected:", deviceId);

    onlineDevices.delete(deviceId);
    console.log("📶 Online Devices:", Array.from(onlineDevices));
});

// When MQTT message received
aedes.on("publish", (packet, client) => {
    if (!client || !packet.topic) return;

    const topic = packet.topic;
    const msg = packet.payload.toString();
    const device = client.id;

    console.log(`📥 MQTT Message from ${device}: ${topic} → ${msg}`);
});


// When MQTT message received
aedes.on("publish", async (packet, client) => {
    if (!client) return;

    const topic = packet.topic;
    const msg = packet.payload.toString();
    const device = client.id;

    console.log(`📥 MQTT Message from ${device}: ${topic} → ${msg}`);

    // Save in MongoDB
    await MqttModel.create({
        topic: topic,
        message: msg,
        deviceId: device
    });
});
