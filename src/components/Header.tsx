import { GameController } from '@phosphor-icons/react';

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <GameController size={32} />
        Guía de Accesibilidad para Videojuegos
      </h1>
      <p>
        Descubre videojuegos que se adaptan a ti. Filtra por precio, dificultad, idioma y plataforma para encontrar juegos accesibles según tus necesidades y preferencias. Cada juego incluye información detallada sobre requisitos del sistema, barreras de entrada y características de accesibilidad.
      </p>
    </header>
  );
};
