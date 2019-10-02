import React from 'react';

const FPSCounter = () => {
  const [fps, setFPS] = React.useState(0);
  React.useEffect(() => {
    const times = [];
    (function refreshLoop() {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        setFPS(times.length);
        refreshLoop();
      });
    })()
  }, []);
  const color = React.useMemo(() => {
    if (fps >= 50) {
      return 'green';
    }
    if (fps < 50 && fps >= 30) {
      return 'yellow';
    }
    return 'red';
  }, [fps]);

  return <div className="FPSCounter" style={{ color }}>FPS:{fps}</div>;
};

export default FPSCounter;
