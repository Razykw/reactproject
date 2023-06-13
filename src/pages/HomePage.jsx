import React from 'react';
import '../css/homepage.css';

function HomePage() {
  const backgroundImageUrl = 'https://cdn.wallpapersafari.com/94/47/6SPGvX.jpg';

  return (
    <div className="home-page" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <h1>Welcome to our Apple Store</h1>
      {/* <p>Razy's-Store</p> */}
    </div>
  );
}

export default HomePage;
