/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import './../styles/scroll.css'
export const MusicMapper = ({canciones, cambiarCancion}) => {
  return (
    <div className="container mx-auto h-[94%] overflow-auto">
      <ul>
        {canciones.map((cancion, index) => (
          <li className="border-sky-500 border-2 shadow p-1 my-2" key={index} onClick={() => cambiarCancion(index)}>
            {cancion.slice(11)}
          </li>
        ))}
      </ul>
    </div>
  );
};
