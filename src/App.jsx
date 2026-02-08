import React, { useState } from 'react';

export default function ValentineApp() {
  const [started, setStarted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: null, left: null });

  const yesButtonSize = noCount * 20 + 16;
  const rejectionThreshold = 12;

  const phrases = [
    "არა", "რატო?? :((", "გთხოვ პაწუ",
    "მეწყინება", "უმამიში წაგიყვან😊", "გთხოვ",
    ":(", "დავიღუპები", "დავიღუპე😒", "ამ საიტის ხათრით მაინც",
    "ბოლოჯერ გთხოვ!!!!", "არა? :(",
  ];

  const lastPhraseIndex = phrases.length - 1;
  const noIsFinal = noCount >= lastPhraseIndex;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%', // Changed from 100vw to 100%
      backgroundColor: '#ffe4ec',
      fontFamily: "'Noto Serif Georgian', serif",
      textAlign: 'center',
      overflow: 'hidden', // Keeps the "No" button and hearts contained
      position: 'relative',
      letterSpacing: '3px',
      margin: 0,
      padding: 0,
    },
    continueButton: {
      backgroundColor: '#fb7185',
      color: 'white',
      padding: '15px 32px',
      fontSize: '1.2rem',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(251, 113, 133, 0.4)',
      transition: 'transform 0.3s',
      zIndex: 10,
    },
    yesButton: {
      fontSize: `${yesButtonSize}px`,
      backgroundColor: '#10b981',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      marginRight: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    noButton: {
      position: noButtonPos.top ? 'absolute' : 'relative',
      top: noButtonPos.top,
      left: noButtonPos.left,
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: '0.1s',
    },
    gif: {
      width: '380px',
      maxWidth: '90%', // Ensures it doesn't cause overflow on mobile
      borderRadius: '40px',
      marginBottom: '40px',
    }
  };

  const handleNoClick = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);

    // Reduced range slightly to ensure the button doesn't teleport off-screen
    const randomTop = Math.floor(Math.random() * 60 + 20);
    const randomLeft = Math.floor(Math.random() * 60 + 20);
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });

    if (newCount >= rejectionThreshold) {
      setYesPressed(true);
    }
  };

  // Common Style for Body reset
  const GlobalStyles = () => (
    <style>
      {`
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden; /* This kills the main scrollbar */
          width: 100%;
          height: 100%;
        }
        @keyframes fall {
          0% { transform: translateY(-10%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(960deg); opacity: 0.2; }
        }
      `}
    </style>
  );

  if (!started) {
    const hearts = Array.from({ length: 100 }).map((_, i) => {
      const left = Math.random() * 100 + '%';
      const delay = Math.random() * 5 + 's';
      const duration = (5 + Math.random() * 5) + 's';
      const size = 20 + Math.random() * 20 + 'px';
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-50px',
            left,
            fontSize: size,
            animation: `fall ${duration} linear ${delay} infinite`,
            pointerEvents: 'none', // Prevents hearts from blocking clicks
          }}
        >
          💙
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <GlobalStyles />
        {hearts}
        <h1 style={{ color: '#bd345bff', fontSize: '3rem', marginBottom: '125px', padding: '0 20px' }}>
          სიყვარულით ანას შოთისგან
        </h1>
        <button
          style={styles.continueButton}
          onClick={() => setStarted(true)}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.25)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          გახსენი 💌
        </button>
      </div>
    );
  }

  if (yesPressed) {
    return (
      <div style={styles.container}>
        <GlobalStyles />
        <img
          src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          alt="Kissing bears"
          style={styles.gif}
        />
        <h1 style={{ fontSize: '3rem', color: '#e11d48' }}>🥳🥳🥳მიყვარხარ 💙💙💙</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <GlobalStyles />
      <img
        src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
        alt="Asking bear"
        style={styles.gif}
      />
      <h1 style={{ fontSize: '2.5rem', color: '#9f1239', marginBottom: '30px' }}>
        იქნები ჩემი ვალენტინი? 🌹
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          style={styles.yesButton}
          onClick={() => setYesPressed(true)}
        >
          კი
        </button>
        <button
          onMouseEnter={handleNoClick}
          onClick={() => {
            handleNoClick();
            if (noIsFinal) setYesPressed(true);
          }}
          style={{
            ...styles.noButton,
            backgroundColor: noIsFinal ? '#10b981' : styles.noButton.backgroundColor,
          }}
        >
          {noIsFinal ? 'კი!' : phrases[Math.min(noCount, phrases.length - 1)]}
        </button>
      </div>
    </div>
  );
}