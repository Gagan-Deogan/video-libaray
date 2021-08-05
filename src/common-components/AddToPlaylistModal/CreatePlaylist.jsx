export const CreatePlaylist = ({
  isError,
  newPlaylistName,
  setNewPlaylistName,
  setShowCreatePlaylist,
  handleCreatePlaylist,
}) => {
  return (
    <>
      <fieldset className="column margin-t-8 padding-t-8 padding-b-16">
        <input
          type="text"
          placeholder="Name"
          name="new Playlist"
          className={isError ? "text-err-area margin-t-8" : "margin-t-8"}
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}></input>
        <div className={isError && "text-err"}>
          {isError && "This Name already Exists"}
        </div>
      </fieldset>
      <fieldset className="padding-8 row justify-end">
        <button
          className="sm-btn-pry margin-r-16"
          onClick={() => setShowCreatePlaylist(false)}>
          Cancel
        </button>
        <button
          className={
            !!!newPlaylistName || isError
              ? "sm-btn-pry-fil btn-dis"
              : "sm-btn-pry-fil"
          }
          onClick={handleCreatePlaylist}
          disabled={!newPlaylistName || isError}>
          Create
        </button>
      </fieldset>
    </>
  );
};
