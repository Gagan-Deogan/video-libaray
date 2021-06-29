import { reducer } from "./playlist.reducer";

describe("Testing Playlists Reducer", () => {
  test("Should load all Playlists", () => {
    const action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [
        {
          _id: "playlist-1",
          name: "My Playlist",
          description: "Some description",
          videos: [
            {
              _id: "video-1",
              title: "video-1-title",
              description: "video-1-description",
            },
          ],
        },
      ],
    };

    const initialState = [];
    const state = reducer(initialState, action);

    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
          },
        ],
      },
    ]);
  });
  test("Add video to playlist if its not there , Remove video from Playlist if its already present.", () => {
    let action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [
        {
          _id: "playlist-1",
          name: "My Playlist",
          description: "Some description",
          videos: [],
        },
      ],
    };

    const initialState = [];
    let state = reducer(initialState, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [],
      },
    ]);

    action = {
      type: "TOOGLE_VIDEO_FROM_PLAYLIST",
      payload: {
        playlistId: "playlist-1",
        video: {
          _id: "video-1",
          title: "video-1-title",
          description: "video-1-description",
        },
      },
    };

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
          },
        ],
      },
    ]);

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [],
      },
    ]);
  });

  test("should remove Playlist", () => {
    let action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [
        {
          _id: "playlist-1",
          name: "My Playlist",
          description: "Some description",
          videos: [
            {
              _id: "video-1",
              title: "video-1-title",
              description: "video-1-description",
            },
          ],
        },
      ],
    };
    const initialState = [];
    let state = reducer(initialState, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
          },
        ],
      },
    ]);

    action = {
      type: "REMOVE_PLAYLIST",
      payload: "playlist-1",
    };

    state = reducer(state, action);

    expect(state).toEqual([]);
  });

  test("should create New Playlist", () => {
    const initialPlaylist = [];
    let action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [],
    };
    let state = reducer(initialPlaylist, action);
    expect(state).toEqual([]);

    action = {
      type: "CREATE_PLAYLIST",
      payload: { _id: "playlist-1", name: "My Playlist" },
    };
    state = reducer(state, action);
    console.log(state);
    expect(state).toEqual([{ _id: "playlist-1", name: "My Playlist" }]);
  });

  test("should Edit despcrition of playlist", () => {
    let action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [
        {
          _id: "playlist-1",
          name: "My Playlist",
          description: "Some description",
          videos: [
            {
              _id: "video-1",
              title: "video-1-title",
              description: "video-1-description",
            },
          ],
        },
      ],
    };
    const initialState = [];
    let state = reducer(initialState, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "Some description",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
          },
        ],
      },
    ]);

    action = {
      type: "EDIT_DESCRIPTION",
      payload: {
        playlistId: "playlist-1",
        description: "changed description",
      },
    };

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Playlist",
        description: "changed description",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
          },
        ],
      },
    ]);
  });

  test("should Add notes to if video already present , if video not present add video and note", () => {
    let action = {
      type: "LOAD_USER_PLAYLIST",
      payload: [
        {
          _id: "playlist-1",
          name: "My Notes",
          videos: [
            {
              _id: "video-1",
              title: "video-1-title",
              description: "video-1-description",
              notes: [],
            },
          ],
        },
      ],
    };

    let initialState = [];
    let state = reducer(initialState, action);

    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Notes",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
            notes: [],
          },
        ],
      },
    ]);

    action = {
      type: "ADD_NOTE",
      payload: {
        video: {
          _id: "video-1",
          title: "video-1-title",
          description: "video-1-description",
        },
        note: { note: "this is Awesome", time: "15" },
      },
    };

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Notes",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
            notes: [{ note: "this is Awesome", time: "15" }],
          },
        ],
      },
    ]);

    action = {
      type: "TOOGLE_VIDEO_FROM_PLAYLIST",
      payload: {
        playlistId: "playlist-1",
        video: {
          _id: "video-1",
          title: "video-1-title",
          description: "video-1-description",
        },
      },
    };

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Notes",
        videos: [],
      },
    ]);

    action = {
      type: "ADD_NOTE",
      payload: {
        video: {
          _id: "video-1",
          title: "video-1-title",
          description: "video-1-description",
        },
        note: { note: "this is Awesome", time: "15" },
      },
    };

    state = reducer(state, action);
    expect(state).toEqual([
      {
        _id: "playlist-1",
        name: "My Notes",
        videos: [
          {
            _id: "video-1",
            title: "video-1-title",
            description: "video-1-description",
            notes: [{ note: "this is Awesome", time: "15" }],
          },
        ],
      },
    ]);
  });
});
