import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Book = () => {
  const location = useLocation();
  const { book } = location.state;

  const [playlist, setPlaylist] = useState(book.episodes);
  const [currentEpisode, setCurrentEpisode] = useState({ index: 0, url: playlist[0] });
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [timeoutId, setTimeoutId] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  };

  const handleSelectedColorRemoval = (id) => {
    let selected = document.querySelector(`#${id}`);
    let previouslyActive = document.querySelector(`#epi${currentEpisode.index}`);
    previouslyActive.classList.remove('is-selected');
    selected.classList.add('is-selected');
  };

  const toggleVolumeSlider = () => {
    const volumeWrapper = document.getElementById('volumeWrapper');

    if (volumeWrapper.getAttribute('hidden') == '') {
      volumeWrapper.removeAttribute('hidden');
    }

    if (timeoutId !== null) clearTimeout(timeoutId);

    const timeout = setTimeout(() => {
      volumeWrapper.setAttribute('hidden', '');
    }, 3000);

    setTimeoutId(timeout);

    return;
  };

  const toggleLoadingStatus = () => {
    console.log(isLoading);
    setIsLoading(!isLoading);
  };

  const controlPlayer = (action, event) => {
    let audio = document.querySelector('audio');
    let progressSection = document.querySelector('.progress_filled');
    const volumeWrapper = document.getElementById('volumeWrapper');

    setAudioFile(audio);

    if (action === 'volumeChange') {
      clearTimeout(timeoutId);
      volumeWrapper.removeAttribute('hidden');
      setVolume(event.target.value);
      audio.volume = event.target.value;

      //setting timeoutid state from return value and using it to clear it next time
      setTimeoutId(
        setTimeout(() => {
          volumeWrapper.setAttribute('hidden', '');
        }, 2000)
      );
    }

    setInterval(() => {
      setCurrentTime(formatTime(audio.currentTime));
      const flexPercentage = (audio.currentTime / audio.duration) * 100;
      // progressSection.style.flexBasis = `${flexPercentage}%`;
    }, 500);

    switch (action) {
      case 'play':
        audio.play();
        setisPlaying(true);

        if (currentEpisode.index == 0) {
          let selected = document.querySelector('#epi0');
          selected.classList.add('is-selected');
        }

        return;

      case 'pause':
        audio.pause();
        setisPlaying(false);
        return;

      case 'next':
        //If current episode is last episode do nothing;

        if (currentEpisode.index === playlist.length - 1) return;
        toggleLoadingStatus();
        audio.src = playlist[Number(currentEpisode.index + 1)];
        handleSelectedColorRemoval(`epi${currentEpisode.index + 1}`);
        setCurrentEpisode({ index: Number(currentEpisode.index + 1), url: audio.src });
        audio.play();
        setisPlaying(true);
        return;

      case 'previous':
        //If current episode is first episode do nothing;
        if (currentEpisode.index == 0) return;
        toggleLoadingStatus();
        handleSelectedColorRemoval(`epi${currentEpisode.index - 1}`);
        audio.src = playlist[Number(currentEpisode.index - 1)];
        setCurrentEpisode({ index: Number(currentEpisode.index - 1), url: audio.src });
        audio.play();
        return;

      case 'rewind20sec':
        if (!isPlaying) return;

        if (audio.currentTime - 20 >= 0) {
          audio.currentTime = audio.currentTime - 20;
          return;
        }

        return (audio.currentTime = 0);

      case 'forward20sec':
        if (!isPlaying) return;

        if (audio.currentTime + 20 <= audio.duration) {
          audio.currentTime = audio.currentTime + 20;
          return;
        }

        return (audio.currentTime = audio.duration);

      case 'selectSong':
        toggleLoadingStatus();
        audio.src = currentEpisode.url;
        audio.play();
        setisPlaying(true);
        return;

      default:
        return;
    }
  };

  return (
    <div className='book'>
      <div className='bookAndNav'>
        <Link to='/' className='goBack'>
          <i className='fa-solid fa-arrow-left'></i>
        </Link>
        <h1 className='title is-3 has-text-centered bookTitle'>{book.title}</h1>
        <span className='empty'></span>
      </div>
      <p className='icon-text subtitle authorAndDuration'>
        <span className='icon'>
          <i className='fa-solid fa-pen-nib'></i>
        </span>
        {book.author} <br />
        total 3.5 hrs with {book.episodes.length} episodes
      </p>

      <p className='subtitle releasedDate'>Released on {book.released}</p>
      <p className='description'>{book.description}</p>
      <div className='player'>
        <audio preload='auto' onLoadedData={toggleLoadingStatus}>
          <source src={currentEpisode.url} key={currentEpisode.index} type='audio/mpeg' />
        </audio>
        <span className='nowPlaying title is-6'>Episode {currentEpisode.index + 1}</span>

        <div className='progressBar'>
          <span className='currentTime'>{currentTime} &nbsp;&nbsp;</span>
          {isLoading ? (
            <div className='animation'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <div className='progress'>
              <div className='progress_filled'></div>
            </div>
          )}
          <span className='totalTime'> {audioFile ? formatTime(audioFile.duration) : '00:00'}</span>
        </div>

        <div className='controls'>
          <span className='volumeControl'>
            <i
              className='fa-solid fa-volume-low'
              title='Adjust Volume'
              onClick={() => toggleVolumeSlider()}
            ></i>
            <div className='volumeWrapper' id='volumeWrapper' hidden>
              <span className='volumeCounter'>{Math.floor(volume * 100)}</span>
              <input
                className='volumeSlider'
                type='range'
                value={volume}
                min='0'
                max='1'
                step='0.01'
                onChange={(e) => controlPlayer('volumeChange', e)}
              />
            </div>
          </span>
          <i
            className='fa-solid fa-backward-step'
            title='Previous'
            onClick={() => controlPlayer('previous')}
          ></i>
          <i
            className='fa-solid fa-backward'
            title='Rewind 30 sec'
            onClick={() => controlPlayer('rewind20sec')}
          ></i>
          {isPlaying ? (
            <i
              className='fa-solid fa-pause'
              title='pause'
              onClick={() => controlPlayer('pause')}
            ></i>
          ) : (
            <i className='fa-solid fa-play' title='play' onClick={() => controlPlayer('play')}></i>
          )}
          <i
            className='fa-solid fa-forward'
            title='Forward 30 sec'
            onClick={() => controlPlayer('forward20sec')}
          ></i>
          <i
            className='fa-solid fa-forward-step'
            title='Next'
            onClick={() => controlPlayer('next')}
          ></i>
        </div>

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
                    controlPlayer('selectSong');
                  }}
                >
                  <td>Episode {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Book;
