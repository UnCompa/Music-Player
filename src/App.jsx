/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Player } from "./components/Player";
import { MusicMapper } from "./components/MusicMapper";
import { useState } from "react";
// import Player from "@";
// import "@madzadev/audio-player/dist/index.css";
// import { NewPlayer } from "./components/NewPlayer";

const App = () => {
  const [canciones, setCanciones] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);

  useEffect(() => {
    const cargarCanciones = async () => {
      try {
        // Construye la URL directa al archivo JSON en la carpeta public
        const url = "/musics.json?url=" + new Date().getTime();

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

  const cambiarCancion = (index) => {
    setCancionActual(canciones[index]);
  };

  return (
    <div className="flex-col">
      <section className="h-[93vh]">
        <header className="bg-sky-900">
          <h1 className="text-white text-center py-2 font-bold">Music</h1>
        </header>
        <MusicMapper canciones={canciones} cambiarCancion={cambiarCancion}/>
      </section>
      <section className="shadow-xl">
        <Player cancionActual={cancionActual}/>
      </section>
      {/* <NewPlayer tracklist={canciones}/> */}
    </div>
  );
};

export default App;
