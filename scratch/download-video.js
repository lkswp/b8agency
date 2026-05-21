const https = require('https');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://assets.mixkit.co/videos/preview/mixkit-filmmaker-operating-a-professional-camera-34440-large.mp4';
const outputPath = path.join(__dirname, '..', 'public', 'bg-video.mp4');

const file = fs.createWriteStream(outputPath);

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://mixkit.co/',
    'Accept': '*/*'
  }
};

console.log('Iniciando download de:', targetUrl);
console.log('Salvando em:', outputPath);

https.get(targetUrl, options, (res) => {
  const { statusCode } = res;
  
  if (statusCode !== 200) {
    console.error(`Falha no download. Código de status: ${statusCode}`);
    // Check if it's a redirect
    if (statusCode === 301 || statusCode === 302) {
      console.log('Redirecionando para:', res.headers.location);
    }
    file.close();
    fs.unlinkSync(outputPath);
    process.exit(1);
  }

  res.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Download concluído com sucesso!');
    const stats = fs.statSync(outputPath);
    console.log(`Tamanho do arquivo: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
    process.exit(0);
  });
}).on('error', (err) => {
  fs.unlinkSync(outputPath);
  console.error('Erro durante a requisição HTTP:', err.message);
  process.exit(1);
});
