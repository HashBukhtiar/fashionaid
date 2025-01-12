import React, { useEffect, useState } from 'react';
import { FaHome, FaComments, FaEllipsisV, FaTrash } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import '../styles/WardrobePage.css';
import wardrobeData from '../wardrobe.json';

function WardrobePage() {
  const [wardrobe, setWardrobe] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newItemColor, setNewItemColor] = useState('#ffffff');
  const [newItemImageUrl, setNewItemImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedWardrobe = JSON.parse(localStorage.getItem('wardrobe')) || wardrobeData.wardrobe;
    setWardrobe(savedWardrobe);
    setSelectedItems(savedWardrobe.filter(item => item.active).map(item => item.id));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.WardrobePage-menu')) {
        setMenuOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSelectItem = (id) => {
    const updatedWardrobe = wardrobe.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setWardrobe(updatedWardrobe);
    setSelectedItems(updatedWardrobe.filter(item => item.active).map(item => item.id));
    localStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
  };

  const removeItem = (id) => {
    const updatedWardrobe = wardrobe.filter(item => item.id !== id);
    setWardrobe(updatedWardrobe);
    setSelectedItems(updatedWardrobe.filter(item => item.active).map(item => item.id));
    localStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
  };

  const handleAddItem = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewItem = () => {
    const newItem = {
      id: wardrobe.length + 1,
      type: 'upper wear', // Default type, can be changed as needed
      hexColor: newItemColor,
      formalityRange: { min: 0, max: 100 }, // Default formality range, can be changed as needed
      imageUrl: newItemImageUrl,
      active: true, // Ensure the item is active by default
    };
    const updatedWardrobe = [...wardrobe, newItem];
    setWardrobe(updatedWardrobe);
    setSelectedItems(updatedWardrobe.filter(item => item.active).map(item => item.id));
    localStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
    setShowAddPopup(false);
  };

  const renderItems = (type) => {
    const getAddText = (type) => {
      switch (type) {
        case 'accessory':
          return 'Add Accessories';
        case 'upper wear':
          return 'Add Upper Wear';
        case 'lower wear':
          return 'Add Lower Wear';
        default:
          return 'Add Item';
      }
    };

    return (
      <>
        {wardrobe
          .filter(item => item.type === type)
          .map(item => (
            <div
              key={item.id}
              className={`WardrobePage-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
              onClick={() => toggleSelectItem(item.id)}
            >
              <div className="WardrobePage-select-circle"></div>
              <img src={item.imageUrl} alt={item.type} className="WardrobePage-item-image" />
              <div className="WardrobePage-color" style={{ backgroundColor: item.hexColor }}></div>
              <p>{item.hexColor}</p>
              <div className="WardrobePage-menu">
                <FaEllipsisV onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === item.id ? null : item.id); }} />
                {menuOpen === item.id && (
                  <div className="WardrobePage-menu-dropdown">
                    <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}>
                      <FaTrash style={{ marginRight: '8px' }} /> Remove Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        <div className="WardrobePage-item WardrobePage-add-item" onClick={handleAddItem}>
          <IoAddCircleOutline className="WardrobePage-add-icon" />
          <div className="WardrobePage-add-text">{getAddText(type)}</div>
        </div>
      </>
    );
  };

  return (
    <div className="WardrobePage">
      <header className="WardrobePage-header">
        <div className="WardrobePage-icons">
          <FaHome className="WardrobePage-icon" onClick={() => navigate('/')} />
          <FaComments className="WardrobePage-icon" onClick={() => navigate('/chat')} />
        </div>
        <h1>My Wardrobe</h1>
      </header>
      <section className="WardrobePage-section">
        <h2>Accessories</h2>
        <div className="WardrobePage-items">
          {renderItems('accessory')}
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Upper Wear</h2>
        <div className="WardrobePage-items">
          {renderItems('upper wear')}
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Lower Wear</h2>
        <div className="WardrobePage-items">
          {renderItems('lower wear')}
        </div>
      </section>
      {showAddPopup && (
        <div className="WardrobePage-popup">
          <div className="WardrobePage-popup-content">
            <h3>Add New Item</h3>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <ChromePicker color={newItemColor} onChangeComplete={(color) => setNewItemColor(color.hex)} />
            </div>
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newItemImageUrl}
              onChange={(e) => setNewItemImageUrl(e.target.value)}
            />
            <button onClick={handleSaveNewItem}>Save</button>
            <button onClick={() => setShowAddPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WardrobePage;