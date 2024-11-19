const express = require('express');
const fs = require('fs'); // Aggiungi l'importazione di fs
const path = require('path'); // Aggiungi path per gestire i percorsi dei file
const app = express();
const port = 3000;

// Endpoint API per restituire i prodotti in formato JSON dalla lettura di un file
app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'api', 'products', 'products.json'); // Percorso del file JSON

  // Leggi il file JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore durante la lettura del file JSON:', err);
      return res.status(500).send('Errore interno del server');
    }

    // Se il file è stato letto correttamente, restituisci i dati
    try {
      const productsData = JSON.parse(data); // Parse del file JSON
      res.setHeader('Content-Type', 'application/json');
      res.json(productsData); // Restituisce i dati in formato JSON
    } catch (parseError) {
      console.error('Errore nel parsing del file JSON:', parseError);
      return res.status(500).send('Errore durante il parsing del file JSON');
    }
  });
});

// Servire file statici (per il frontend)
app.use(express.static('public'));

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
