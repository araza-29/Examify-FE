import React from 'react';
import { useTimer } from 'react-timer-hook';
import $ from 'jquery';

const MyTimer = ({ duration }) => {
    


    const getExpiryTimestamp = (duration) => {
        if (typeof duration !== 'string') {
            console.error('Invalid duration:', duration);
            return null;
        }

        const [minutes, seconds] = duration.split(':').map(Number);

        if (isNaN(seconds) || isNaN(minutes)) {
            console.error('Invalid duration:', duration);
            return null;
        }

        const now = new Date();
        const expiry = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + minutes, now.getSeconds() + seconds);

        return expiry.getTime();
    };

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: getExpiryTimestamp(duration), onExpire: () => {
            console.warn('onExpire called');
            
        } 
    });

    if (duration === null) {
        // Handle the case where the duration is invalid
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '35px', color: 'red' }}>Invalid duration</div>
            </div>
        );
    }

    return (

        <div>
        {(() => {
            // Set a value in localStorage
                localStorage.setItem('timer', minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));
        })()}

        

        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '35px' }}>
                Time Remaining: <div><span id="timeid" >{minutes.toString().padStart(2, '0')}</span>:<span id="secid">{seconds.toString().padStart(2, '0')}</span></div>
            </div>
         
            {/* Rest of the component */}
        </div>

        </div>
    );
};

export default MyTimer;
