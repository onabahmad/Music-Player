import React, { useState } from "react";
import "./AddSongForm.css";

const AddSongForm = ({ addSong }) => {
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongUrl, setNewSongUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState("");

  const handleAddSong = () => {
    if (newSongTitle && newSongUrl && thumbnail) {
      // Checking if the URL ends with ".mp3"
      if (!newSongUrl.toLowerCase().endsWith(".mp3")) {
        setError("Please provide a valid MP3 URL.");
        return;
      }

      const newSong = {
        title: newSongTitle,
        url: newSongUrl,
        thumbnail: URL.createObjectURL(thumbnail),
      };
      addSong(newSong);
      setNewSongTitle("");
      setNewSongUrl("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setError("");
    } else {
      setError("Please fill in all fields, including the thumbnail.");
    }
  };

  const handleThumbnailChange = (e) => {
    const selectedThumbnail = e.target.files[0];

    if (selectedThumbnail) {
      setThumbnail(selectedThumbnail);

      // preview for the thumbnail
      const previewURL = URL.createObjectURL(selectedThumbnail);
      setThumbnailPreview(previewURL);
    }
  };

  return (
    <div className="add-song-form-container">
      <label className="form-label">Song Name</label>
      <input
        className="form-input"
        type="text"
        placeholder="Song Name"
        value={newSongTitle}
        onChange={(e) => setNewSongTitle(e.target.value)}
      />
      <br />
      <label className="form-label">Song link</label>
      <input
        className="form-input"
        type="text"
        placeholder="URL"
        value={newSongUrl}
        onChange={(e) => setNewSongUrl(e.target.value)}
      />
      <br />
      <label className="form-label">Thumbnail:</label>
      <input
        className="form-input "
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
      />
      {thumbnailPreview && (
        <img
          className="thumbnail-preview"
          src={thumbnailPreview}
          alt="Thumbnail Preview"
        />
      )}
      <br />
      {error && <p className="form-error">{error}</p>}
      <div className="form_button_container">
        <button className="form-button" onClick={handleAddSong}>
          Add Song
        </button>
      </div>
    </div>
  );
};

export default AddSongForm;
