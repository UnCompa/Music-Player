/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
const AudioPlayer = ({ songs, currentSongListIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [shouldStartPlaying, setShouldStartPlaying] = useState(false);
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const musicFolder = "Music-Player";

  useEffect(() => {
    setPlaylist(songs);
    setCurrentSongIndex(0);
    setCurrentSong(playlist[currentSongListIndex]);
  }, [songs, currentSongListIndex, playlist]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const updateVolume = () => {
      setVolume(audio.volume);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("volumechange", updateVolume);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("volumechange", updateVolume);
    };
  }, [playlist]);

  useEffect(() => {
    const loadAndPlay = async () => {
      if (currentSongListIndex !== null && currentSong) {
        try {
          setIsLoading(true);

          // Pausar la canción actual
          audioRef.current.pause();

          const path = `${musicFolder}${currentSong}`;
          audioRef.current.src = path;

          // Manejar evento de carga
          audioRef.current.addEventListener("loadedmetadata", async () => {
            // Esperar a que la canción se cargue antes de intentar reproducirla
            await audioRef.current.play();
            setIsPlaying(true);
          });

          // Manejar evento de error
          audioRef.current.addEventListener("error", (error) => {
            console.error("Error al cargar la canción:", error);
            setIsLoading(false);
          });
        } catch (error) {
          console.error("Error al cargar o reproducir la canción:", error);
          setIsLoading(false);
        }
      }
    };

    loadAndPlay();
  }, [currentSong, currentSongListIndex, shouldStartPlaying]);

  const handlePlayPause = () => {
    setShouldStartPlaying(true);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleMute = () => {
    const newVolume = volume === 0 ? 1 : 0;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handlePrevSong = () => {
    const prevIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
    audioRef.current.currentTime = 0;
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
    audioRef.current.currentTime = 0;
  };
  const handleSongEnd = () => {
    handleNextSong();
  };
  const progressPercentage = (currentTime / duration) * 100;
  const volumePercentage = volume * 100;
  return (
    <div className="bg-slate-700 h-40 p-4 grid place-items-center">
      <audio
        ref={audioRef}
        src={currentSong ? currentSong : ""}
        onEnded={handleSongEnd}
        onError={() => {}}
        onCanPlay={() => (audioRef.current.volume = volume)}
      />

      <div className="flex gap-x-2 items-center justify-center">
        <div className="relative pt-1 mt-2">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-lg font-semibold inline-block text-sky-600">
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="w-full bg-teal-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button
          className="text-sky-600 text-2xl font-semibold"
          onClick={handlePrevSong}
        >
          <FaBackwardStep />
        </button>
        <button
          className="bg-zinc-100 h-10 w-10 rounded-full hover:bg-blue-600 hover:fill-white hover:text-white transition-colors flex items-center justify-center"
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="text-sky-600 text-2xl font-semibold"
          onClick={handleNextSong}
        >
          <FaForwardStep />
        </button>
        {/* Botón de mute/desmute */}
        <button
          className="text-sky-500 text-xs font-semibold"
          onClick={handleMute}
        >
          {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <div className="relative">
          {/* Barra principal */}
          <div className="w-24 h-3 bg-gray-300 rounded-full">
            {/* Subbarra que se llena */}
            <div
              className="h-full bg-sky-500 rounded-full z-10"
              style={{ width: `${volumePercentage}%` }}
            />
          </div>

          {/* Control deslizante para ajustar el volumen */}
          <input
            className="appearance-none bg-transparent w-full h-3 absolute top-0 left-0 rounded-full"
            type="range"
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            style={{
              "--thumb-size": "16px",
              "--thumb-color": "#fff",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>
      </div>
      <div>
        <h1 className="text-sm text-white font-bold">{currentSong.slice(11)}</h1>
      </div>
      <div className="w-full">
        <div className="w-full">
          <div className="h-full relative">
            {/* Barra principal */}
            <div className="w-full h-3 bg-gray-300 rounded-full">
              {/* Subbarra que se llena */}
              <div
                className="h-full bg-sky-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* Control deslizante para adelantar/retroceder */}
            <input
              className="appearance-none w-full h-2 rounded bg-white/0 outline-none focus:outline-none absolute bottom-[1px] right-[2px]"
              type="range"
              value={currentTime}
              max={duration || 1}
              onChange={handleTimeChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-center"></div>
      </div>
    </div>
  );
};

export default AudioPlayer;
