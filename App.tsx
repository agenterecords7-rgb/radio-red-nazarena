
import React from 'react';
import RadioPlayer from './components/RadioPlayer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#071025] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Efectos Visuales de Fondo (Ligeros) */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-lg flex flex-col items-center animate-fade-in">
        {/* Cabecera con Branding */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.15em] text-white drop-shadow-lg">
            RED <span className="text-yellow-400">NAZARENA</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-yellow-400/30"></div>
            <p className="text-yellow-400/90 uppercase tracking-[0.3em] text-[10px] md:text-xs font-light italic">
              un sueño cumplido
            </p>
            <div className="h-[1px] w-8 bg-yellow-400/30"></div>
          </div>
        </header>

        {/* Contenedor del Reproductor */}
        <div className="w-full aspect-[4/5] md:aspect-video mb-8">
          <RadioPlayer />
        </div>

        {/* Footer Minimalista */}
        <footer className="text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
            Señal en Vivo • 24 Horas
          </p>
          <p className="text-[9px] mt-1 text-gray-400">
            © {new Date().getFullYear()} RED NAZARENA
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
