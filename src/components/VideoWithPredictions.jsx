import React from 'react';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const videoRef = React.createRef();
const canvasRef = React.createRef();
const constraints = {
  audio: false,
  video: {
    facingMode: 'user',
  },
};

const VideoWithPredictions = ({ predictionMode }) => {
  React.useEffect(() => {
    const { getPredictions } = predictionMode;

    (async () => {
      const [stream] = await Promise.all([
        navigator.mediaDevices.getUserMedia(constraints),
      ]);
      const context = canvasRef.current.getContext('2d');
      const { canvas } = context;
      const { clientWidth, clientHeight } = canvas;
      const drawPredictions = (predictions) => {
        const font = '16px sans-serif';

        context.font = font;
        context.textBaseline = 'top';
        predictions.forEach(({ bbox: [x, y, width, height], class: predictionClass }) => {
          const textWidth = context.measureText(predictionClass).width;
          const textHeight = parseInt(font, 10); // base 10

          context.strokeStyle = '#00FFFF';
          context.lineWidth = 4;
          context.strokeRect(x, y, width, height);
          context.fillStyle = '#00FFFF';
          context.fillRect(x, y, textWidth + 4, textHeight + 4);
          context.fillStyle = '#000000';
          context.fillText(predictionClass, x, y);
        });
      };
      const renderVideo = async () => {
        // получаем ImageData для отправки в модель
        const imageData = context.getImageData(0, 0, clientWidth, clientHeight);
        // получаем предсказания и рисуем их
        const predictions = await getPredictions(imageData);

        // очищаем canvas
        context.clearRect(0, 0, clientWidth, clientHeight);
        // рисуем картинку полученную с video на canvas
        context.drawImage(videoRef.current, 0, 0, clientWidth, clientHeight);
        // рисуем предсказания
        drawPredictions(predictions);
        // планируем при следующем рендере перерисовать canvas
        if (isSafari) {
          setTimeout(renderVideo, 0);
        } else {
          requestAnimationFrame(renderVideo);
        }
      }

      canvas.width = clientWidth;
      canvas.height = clientHeight;
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('play', renderVideo, false);
    })();
  }, [predictionMode]);

  return (
    <div className="VideoWithPredictions">
      <canvas ref={canvasRef} className="Canvas" />
      <video ref={videoRef} className="Video" autoPlay playsInline />
    </div>
  );
}

export default VideoWithPredictions;
