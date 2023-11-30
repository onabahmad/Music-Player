import React, { useRef } from "react";
import "./Player.css";
import { AiOutlinePause } from "react-icons/ai";
import {
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoPlayOutline,
} from "react-icons/io5";
const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
  };

  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);

    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className="player_container">
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div
            className="seek_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
        </div>
      </div>
      <div className="title_Control_wrapper">
        <div className="title">
          {currentSong.thumbnail && (
            <img
              src={currentSong.thumbnail}
              alt={`${currentSong.title} Thumbnail`}
              className="player_Thumbnail"
            />
          )}
          <p>{currentSong.title}</p>
        </div>

        <div className="controls">
          <IoPlaySkipBackOutline className="btn_action" onClick={skipBack} />
          {isplaying ? (
            <AiOutlinePause className="btn_action pp" onClick={PlayPause} />
          ) : (
            <IoPlayOutline className="btn_action pp" onClick={PlayPause} />
          )}
          <IoPlaySkipForwardOutline
            className="btn_action"
            onClick={skiptoNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
