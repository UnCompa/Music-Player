/* eslint-disable react/prop-types */
const SongList = ({ songs, onSongClick }) => {
    return (
      <div className="container bg-gradient-to-t from-gray-900 to-blue-900 mx-auto h-[74vh] overflow-auto p-4">
        <ul>
          {songs.map((cancion, index) => (
            
            <li
              className="bg-gray-900/80 shadow p-2 my-2 text-gray-300 hover:bg-sky-800 transition-colors"
              key={index}
              onClick={() => onSongClick(index)}
            >
              {cancion.slice(11)}
            </li>
          ))
          }
        </ul>
      </div>
    );
  };
  
  export default SongList;
  