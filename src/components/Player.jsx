/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import './../styles/player.css'
export const Player = ({cancionActual}) => {
  return (
      <div className="bg-red-500">
        {cancionActual && (
          <div className="bg-slate-900/50 h-12 relative overflow-hidden bottom-0 pt-[3.1em]">
            <ReactPlayer
              url={cancionActual}
              controls
              volume={1}
              width="100%"
              height="100%"
              className="absolute bottom-0"
            />
          </div>
        )}
      </div>
  );
};
