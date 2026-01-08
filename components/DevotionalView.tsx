
import React, { useState, useEffect } from 'react';
import { getDailyDevotional } from '../services/geminiService.ts';
import { Devotional } from '../types.ts';

const DevotionalView: React.FC = () => {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevotional = async () => {
      try {
        const data = await getDailyDevotional();
        setDevotional(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevotional();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
        <i className="fas fa-book-open text-4xl animate-pulse text-yellow-400"></i>
        <p className="animate-pulse">Preparando el alimento espiritual del día...</p>
      </div>
    );
  }

  if (!devotional) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-400">
        Error al cargar el devocional.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-120px)] scroll-smooth">
      <div className="text-center space-y-2">
        <p className="text-gray-400 uppercase tracking-widest text-sm font-bold pt-4">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-yellow-400 opacity-10 text-8xl">
          <i className="fas fa-quote-right"></i>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">{devotional.title}</h2>
        
        <div className="space-y-8 text-lg leading-relaxed text-gray-200">
          <div className="bg-yellow-400/10 border-l-4 border-yellow-400 p-6 italic text-yellow-100 rounded-r-xl">
            "{devotional.verse}"
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-500">Reflexión</h3>
            <p>{devotional.reflection}</p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">Oración del Día</h3>
            <p className="italic text-gray-300">"{devotional.prayer}"</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pb-12">
        <button 
          onClick={() => window.print()} 
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-all text-sm font-bold uppercase tracking-wider"
        >
          <i className="fas fa-print"></i> Guardar / Imprimir
        </button>
      </div>
    </div>
  );
};

export default DevotionalView;
