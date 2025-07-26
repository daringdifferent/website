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