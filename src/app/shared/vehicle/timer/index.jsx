import React, { useState, useEffect } from 'react';
import moment from 'moment';


function Timer({ start, max, onEnd }) {

  const [permanence, setPermanence] = useState(calcPermanence(start));

  function calcPermanence (start) {
    return moment.duration(moment(new Date()).diff(moment(start)));
  }

  useEffect(() => {
    let interval;
    if (permanence > max) {
      clearTimeout(interval);
      onEnd();
    } else {
      interval = setTimeout(() => {
        setPermanence(calcPermanence(start));
      }, 1000);
    }
    return () => { clearTimeout(interval) }
  }, [permanence]);

  return (
    <div className="timer">
      {moment(permanence.asMilliseconds()).format('mm:ss')}
    </div>
  );
}

export default Timer;