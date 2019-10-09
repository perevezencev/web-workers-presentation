import '@tensorflow/tfjs';
import Stats from 'stats.js';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './App';

const stats = new Stats();

requestAnimationFrame(function loop(){
  stats.update();
  requestAnimationFrame(loop);
});
document.body.appendChild(stats.dom);

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
