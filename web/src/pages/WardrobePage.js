import React from 'react';
import '../styles/WardrobePage.css';

function WardrobePage() {
  return (
    <div className="WardrobePage">
      <header className="WardrobePage-header">
        <h1>My Wardrobe</h1>
      </header>
      <section className="WardrobePage-section">
        <h2>Accessories</h2>
        <div className="WardrobePage-items">
          {/* Add accessory items here */}
          <div className="WardrobePage-item">Watch</div>
          <div className="WardrobePage-item">Hat</div>
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Sweaters</h2>
        <div className="WardrobePage-items">
          {/* Add sweater items here */}
          <div className="WardrobePage-item">Red Sweater</div>
          <div className="WardrobePage-item">Blue Sweater</div>
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Pants</h2>
        <div className="WardrobePage-items">
          {/* Add pants items here */}
          <div className="WardrobePage-item">Jeans</div>
          <div className="WardrobePage-item">Chinos</div>
        </div>
      </section>
    </div>
  );
}

export default WardrobePage;
