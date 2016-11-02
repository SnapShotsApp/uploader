/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { spawn } from 'child_process';
import minimist from 'minimist';
import config from './webpack/development';

const argv = minimist(process.argv.slice(2));

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3308;

const wdm = devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
});

app.use(wdm);
app.use(hotMiddleware(compiler));

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit' })
      .on('close', code => process.exit(code))
      .on('error', spawnErr => console.error(spawnErr));
  }

  console.log(`Listening on http://localhost:${PORT}`);
});

process.on('SIGERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => process.exit(0));
});

