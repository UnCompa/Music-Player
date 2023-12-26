/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Player } from "./components/Player";
import { MusicMapper } from "./components/MusicMapper";
import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import SongList from "./components/SongList";

const App = () => {
  const [canciones, setCanciones] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const cargarCanciones = async () => {
      try {
        // Construye la URL directa al archivo JSON en la carpeta public
        const url = "/Music-Player/musics.json?url=" + new Date().getTime();

        // Realiza la solicitud para cargar el archivo JSON
        const response = await fetch(url);
        const data = await response.json();

        // Actualiza el estado con las canciones cargadas
        setCanciones(data);
        setCancionActual(data[0]); // Establece la primera canción como la actual
      } catch (error) {
        console.error("Error al cargar las canciones:", error);
      }
    };
    cargarCanciones();
  }, []);

  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
    setCancionActual(canciones[index]);
  };
  const cambiarCancion = (index) => {
    setCancionActual(canciones[index]);
  };
  return (
    <div className="flex-col">
      <header className="bg-sky-600">
        <h1 className="text-white text-center py-2 font-bold">Musica</h1>
      </header>
      <section>
        <SongList songs={canciones} onSongClick={handleSongClick} />
      </section>
      <section>
        <AudioPlayer
          songs={canciones}
          currentSongListIndex={currentSongIndex}
        />
      </section>
    </div>
  );
};

export default App;
