import * as cocoSsd from '@tensorflow-models/coco-ssd';
import nanoid from 'nanoid';

const modelPromise = cocoSsd.load();

export const getPredictionsInMainThreed = async (imageData) => {
  const model = await modelPromise;
  const predictions = await model.detect(imageData);

  return predictions;
}

export const getPredictionsInWebWorker = (imageData) => {
  const key = nanoid();
     
  window.predictionsWorker.postMessage({ key, imageData });

  return new Promise(resolve => {
    window.predictionsWorker.addEventListener('message', ({ data }) => {
      const { key: answerKey, predictions } = JSON.parse(data);

      if (key === answerKey) {
        resolve(predictions);
      }
    });
  });
}
