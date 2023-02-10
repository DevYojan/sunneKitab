export default function Playlist({
  playlist,
  handleSelectedColorRemoval,
  setCurrentEpisode,
  controlPlayer,
}) {
  return (
    <div className='playlist'>
      <table className='table is-striped is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>Episodes</th>
          </tr>
        </thead>
        <tbody>
          {playlist.map((episode, index) => (
            <tr
              key={episode}
              id={`epi${index}`}
              onClick={(e) => {
                handleSelectedColorRemoval(`epi${index}`);
                setCurrentEpisode({ index, url: episode });
                controlPlayer('selectSong', e);
              }}
            >
              <td>Episode {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
