const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.example' });

const app = express();
app.set('port', process.env.PORT || 8080);
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

app.listen(app.get('port'), () => {
  const { BASE_URL } = process.env;
  const colonIndex = BASE_URL.lastIndexOf(':');
  const port = parseInt(BASE_URL.slice(colonIndex + 1), 10);

  if (!BASE_URL.startsWith('http://localhost')) {
    console.log(
      `The BASE_URL env variable is set to ${BASE_URL}. If you directly test the application through http://localhost:${app.get('port')} instead of the BASE_URL, it may cause a CSRF mismatch or an Oauth authentication failure. To avoid the issues, change the BASE_URL or configure your proxy to match it.\n`,
    );
  } else if (app.get('port') !== port) {
    console.warn(
      `WARNING: The BASE_URL environment variable and the App have a port mismatch. If you plan to view the app in your browser using the localhost address, you may need to adjust one of the ports to make them match. BASE_URL: ${BASE_URL}\n`,
    );
  }

  console.log(
    `App is running on http://localhost:${app.get('port')} in ${app.get('env')} mode.`,
  );
  console.log('Press CTRL-C to stop.');
});
