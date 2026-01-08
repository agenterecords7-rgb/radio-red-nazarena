
import React from 'react';

const RadioPlayer: React.FC = () => {
  return (
    <div className="w-full h-full bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
      {/* Efecto de cristal en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
      
      <iframe
        src="https://a13.asurahosting.com/public/red_nazarena"
        className="w-full h-full border-none"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        title="Red Nazarena Radio"
        loading="eager"
      />
      
      {/* Script silencioso para mantener la sesión activa en el móvil */}
      <audio autoPlay loop className="hidden" muted>
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=" type="audio/wav" />
      </audio>
    </div>
  );
};

export default RadioPlayer;
