const express = require('express');
const { SerialPort, SerialPortStream } = require('serialport'); // Import sesuai dengan versi

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint untuk menampilkan daftar port COM
app.get('/api/list-com', (req, res) => {
  SerialPort.list()  // Gunakan SerialPortStream.list() untuk versi terbaru
    .then(ports => {
      const portList = ports.map(port => ({
        path: port.path,
        manufacturer: port.manufacturer || 'Unknown'
      }));
      res.json({ ports: portList });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Endpoint untuk membuat label dengan memilih port COM dari list COM
app.post('/api/create-label', (req, res) => {
  const { selectedPort, labelName } = req.body;

  if (!selectedPort || !labelName) {
    return res.status(400).json({ error: 'Port COM dan nama label diperlukan' });
  }

  // Membuat label (dummy example)
  const label = {
    labelName,
    comPort: selectedPort,
    createdAt: new Date()
  };

  res.json({ message: 'Label berhasil dibuat', label });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
