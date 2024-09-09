const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Menghubungkan ke port COM modem (ganti dengan port COM yang sesuai)
const port = new SerialPort({
  path: 'COM3', // Sesuaikan dengan port COM modem
  baudRate: 9600 // Sesuaikan dengan baud rate modem Anda
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Event saat port terbuka
port.on('open', () => {
  console.log('Modem terbuka, mengirim perintah AT untuk mode teks...');
  
  // Mengirim perintah AT untuk mengatur mode teks
  port.write('AT+CMGF=1\r');
});

// Event saat data diterima
parser.on('data', (data) => {
  console.log('Data dari modem: ', data);

  // Jika modem siap, kirim perintah untuk membaca SMS
  if (data.includes('OK')) {
    console.log('Mengambil semua SMS...');
    port.write('AT+CMGL="ALL"\r');
  }
});

// Event saat terjadi error
port.on('error', (err) => {
  console.error('Error: ', err.message);
});
