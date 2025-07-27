import React from "react";

export default function ComingSoon() {
  return (
    <div className="coming-soon-container">
      <div className="overlay">
        <h1> Coming Soon</h1>
        
        <button className="notify-btn"><a
            href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
            >Notify Me</a></button>
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";

// function getTimeLeft(target) {
//   const diff = target - Date.now();

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
//   }

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   return { days, hours, minutes, seconds, isOver: false };
// }

// export default function ComingSoon() {
//   // 🔁 Change this to your real launch date/time
//   const targetDate = new Date("2025-12-31T23:59:59Z").getTime();

//   const [time, setTime] = useState(() => getTimeLeft(targetDate));

//   useEffect(() => {
//     const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div className="container">
//       <div className="sections1">
//         <h1>Our Website is Coming Soon</h1>
//         <hr />
//         <p>
//           Stay tuned for updates and get ready for an extraordinary experience!
//         </p>

//         {!time.isOver ? (
//           <div className="cont-btn">
//             <button>
//               {time.days} <br />
//               <span>DAYS</span>
//             </button>
//             <button>
//               {time.hours} <br />
//               <span>HOURS</span>
//             </button>
//             <button>
//               {time.minutes} <br />
//               <span>MINUTES</span>
//             </button>
//             <button>
//               {time.seconds} <br />
//               <span>SECONDS</span>
//             </button>
//           </div>
//         ) : (
//           <div className="cont-btn">
//           <button>
//             00 <br />
//             <span>DAYS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>HOURS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>MINUTES</span>
//           </button>
//           <button>
//             00 <br />
//             <span>SECONDS</span>
//           </button>
//           <p style={{ marginTop: 16, fontWeight: 600 }}>We are live! 🎉</p>
//         </div>
//         )}

//         <div style={{ marginTop: 24 }}>
//          <a
//             href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
//             >
//             Send Feedback
//         </a>

//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// function getTimeLeft(target) {
//   const diff = target - Date.now();

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
//   }

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   return { days, hours, minutes, seconds, isOver: false };
// }

// export default function ComingSoon() {
//   // 🔁 Change this to your real launch date/time
//   const targetDate = new Date("2025-12-31T23:59:59Z").getTime();

//   const [time, setTime] = useState(() => getTimeLeft(targetDate));

//   useEffect(() => {
//     const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div className="container">
//       <div className="sections1">
//         <h1>Our Website is Coming Soon</h1>
//         <hr />
//         <p>
//           Stay tuned for updates and get ready for an extraordinary experience!
//         </p>

//         {!time.isOver ? (
//           <div className="cont-btn">
//             <button>
//               {time.days} <br />
//               <span>DAYS</span>
//             </button>
//             <button>
//               {time.hours} <br />
//               <span>HOURS</span>
//             </button>
//             <button>
//               {time.minutes} <br />
//               <span>MINUTES</span>
//             </button>
//             <button>
//               {time.seconds} <br />
//               <span>SECONDS</span>
//             </button>
//           </div>
//         ) : (
//           <div className="cont-btn">
//           <button>
//             00 <br />
//             <span>DAYS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>HOURS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>MINUTES</span>
//           </button>
//           <button>
//             00 <br />
//             <span>SECONDS</span>
//           </button>
//           <p style={{ marginTop: 16, fontWeight: 600 }}>We are live! 🎉</p>
//         </div>
//         )}

//         <div style={{ marginTop: 24 }}>
//          <a
//             href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
//             >
//             Send Feedback
//         </a>

//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// function getTimeLeft(target) {
//   const diff = target - Date.now();

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
//   }

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   return { days, hours, minutes, seconds, isOver: false };
// }

// export default function ComingSoon() {
//   // 🔁 Change this to your real launch date/time
//   const targetDate = new Date("2025-12-31T23:59:59Z").getTime();

//   const [time, setTime] = useState(() => getTimeLeft(targetDate));

//   useEffect(() => {
//     const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div className="container">
//       <div className="sections1">
//         <h1>Our Website is Coming Soon</h1>
//         <hr />
//         <p>
//           Stay tuned for updates and get ready for an extraordinary experience!
//         </p>

//         {!time.isOver ? (
//           <div className="cont-btn">
//             <button>
//               {time.days} <br />
//               <span>DAYS</span>
//             </button>
//             <button>
//               {time.hours} <br />
//               <span>HOURS</span>
//             </button>
//             <button>
//               {time.minutes} <br />
//               <span>MINUTES</span>
//             </button>
//             <button>
//               {time.seconds} <br />
//               <span>SECONDS</span>
//             </button>
//           </div>
//         ) : (
//           <div className="cont-btn">
//           <button>
//             00 <br />
//             <span>DAYS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>HOURS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>MINUTES</span>
//           </button>
//           <button>
//             00 <br />
//             <span>SECONDS</span>
//           </button>
//           <p style={{ marginTop: 16, fontWeight: 600 }}>We are live! 🎉</p>
//         </div>
//         )}

//         <div style={{ marginTop: 24 }}>
//          <a
//             href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
//             >
//             Send Feedback
//         </a>

//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";

// function getTimeLeft(target) {
//   const diff = target - Date.now();

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
//   }

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   return { days, hours, minutes, seconds, isOver: false };
// }

// export default function ComingSoon() {
//   // 🔁 Change this to your real launch date/time
//   const targetDate = new Date("2025-12-31T23:59:59Z").getTime();

//   const [time, setTime] = useState(() => getTimeLeft(targetDate));

//   useEffect(() => {
//     const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div className="container">
//       <div className="sections1">
//         <h1>Our Website is Coming Soon</h1>
//         <hr />
//         <p>
//           Stay tuned for updates and get ready for an extraordinary experience!
//         </p>

//         {!time.isOver ? (
//           <div className="cont-btn">
//             <button>
//               {time.days} <br />
//               <span>DAYS</span>
//             </button>
//             <button>
//               {time.hours} <br />
//               <span>HOURS</span>
//             </button>
//             <button>
//               {time.minutes} <br />
//               <span>MINUTES</span>
//             </button>
//             <button>
//               {time.seconds} <br />
//               <span>SECONDS</span>
//             </button>
//           </div>
//         ) : (
//           <div className="cont-btn">
//           <button>
//             00 <br />
//             <span>DAYS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>HOURS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>MINUTES</span>
//           </button>
//           <button>
//             00 <br />
//             <span>SECONDS</span>
//           </button>
//           <p style={{ marginTop: 16, fontWeight: 600 }}>We are live! 🎉</p>
//         </div>
//         )}

//         <div style={{ marginTop: 24 }}>
//          <a
//             href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
//             >
//             Send Feedback
//         </a>

//         </div>
//       </div>
//     </div>
//   );
// }
