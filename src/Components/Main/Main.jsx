import React, { useState, useRef, useEffect } from "react";
import { songsdata } from "./Audio";
import Modal from "./Modal/Modal";
import Player from "./Player/Player";
import AddSongForm from "./SongForm/AddSongForm";
import "./Main.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { FaPauseCircle } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";

const Main = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying, currentSong]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  const addSong = (newSong) => {
    const currentDate = new Date().toLocaleDateString();
    const songWithDate = { ...newSong, date: currentDate };
    setSongs([...songs, songWithDate]);
    setCurrentSong(songWithDate);
    closeAddSongModal();
  };

  const openAddSongModal = () => {
    setIsModalOpen(true);
  };

  const closeAddSongModal = () => {
    setIsModalOpen(false);
  };

  const playPauseSong = (song) => {
    setCurrentSong(song);
    setisplaying(!isplaying);
  };

  const deleteSong = (song) => {
    const isPlayingCurrentSong = currentSong === song;

    const updatedSongs = songs.filter((s) => s !== song);
    setSongs(updatedSongs);

    if (isPlayingCurrentSong) {
      setisplaying(false);
    }
  };

  return (
    <div className="app-container">
      {/* Open Modal Button */}
      <div className="modal_addButton">
        <button className="add-song-button" onClick={openAddSongModal}>
          Add Songs
        </button>
      </div>

      {/* Add Song Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeAddSongModal}>
        <h2>Add a Song</h2>
        <AddSongForm addSong={addSong} />
      </Modal>

      {/* Display Song List as a Table */}
      <div className="song-list-container">
        <table>
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Source</th>
              <th>ADDED ON</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.title}>
                <td className="thumbnail_title">
                  {" "}
                  <td className="thumbnail_container">
                    <img
                      src={song.thumbnail}
                      alt={`${song.title} Thumbnail`}
                      className="thumbnail"
                    />
                  </td>
                  {song.title}
                </td>
                <td>{song.url}</td>
                <td>{song.date}</td>
                <td>
                  <button
                    className="playPauseSong"
                    onClick={() => playPauseSong(song)}
                  >
                    {isplaying && currentSong.title === song.title ? (
                      <FaPauseCircle />
                    ) : (
                      <BsPlayCircleFill />
                    )}
                  </button>
                </td>
                <td>
                  <button
                    className="deleteSong"
                    onClick={() => deleteSong(song)}
                  >
                    <LuTrash className="deleteSong" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <audio
        src={currentSong ? currentSong.url : ""}
        ref={audioElem}
        onTimeUpdate={onPlaying}
      />
      <Player
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default Main;
