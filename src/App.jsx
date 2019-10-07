import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getPredictionsInMainThreed, getPredictionsInWebWorker } from './utils'
import VideoWithPredictions from './components/VideoWithPredictions';

import './styles.css';

const PREDICTIONS_RENDER_MODES = {
  classificationInMainThreed: {
    getPredictions: async (imageData) => {
      const predictions = await getPredictionsInMainThreed(imageData);

      return predictions;
    }
  },
  classificationInWebWorker: {
    getPredictions: async (imageData) => {
      const predictions = await getPredictionsInWebWorker(imageData);

      return predictions;
    }
  },
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/classificationInMainThreed" render={() => (
            <VideoWithPredictions predictionMode={PREDICTIONS_RENDER_MODES.classificationInMainThreed} />
          )} />
          <Route path="/classificationInWebWorker" render={() => (
            <VideoWithPredictions predictionMode={PREDICTIONS_RENDER_MODES.classificationInWebWorker} />
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
