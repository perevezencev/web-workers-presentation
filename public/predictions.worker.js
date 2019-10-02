// hello.worker.js
self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs', 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd');

const modelPromise = cocoSsd.load()

self.addEventListener('message', ({ data: { key, imageData } }) => {
  modelPromise.then(model => {
    model.detect(imageData).then(predictions => {
      self.postMessage(JSON.stringify({ key, predictions }));
    });
  });
});
