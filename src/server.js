import app from './app';

const port = process.env.APP_PORT;
// app.listen(port);

app.listen(port, () => {
  console.log(`CTRL + Clique em http://localhost:${port}`);
});
