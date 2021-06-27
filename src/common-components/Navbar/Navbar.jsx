import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import { usePlaylist } from "context/PlaylistProvider";
import { useTheme } from "context/ThemeProvider";
import { Model } from "../Model";
import { Hidden } from "../Hidden";
import { Avatar } from "../Avatar";
import {
  HomeIcon,
  PlaylistIcon,
  SaveIcon,
  LikeIcon,
  HamBurger,
  Logo,
  Moon,
  Sun,
  NoteIcon,
} from "assests/icons";
import useDefaultImage from "assests/images/dp.png";
import { commonPlaylist } from "constants/index";

const options = {
  Home: { icon: <HomeIcon />, link: "/" },
  "Saved Videos": { icon: <SaveIcon />, link: "playlist/Saved Videos" },
  "Liked Videos": { icon: <LikeIcon />, link: "playlist/Liked Videos" },
  "My Notes": { icon: <NoteIcon />, link: "playlist/My Notes" },
  "My Playlist": { icon: <PlaylistIcon />, link: "playlist/My Playlist" },
};
const NavOption = ({ isNavbarOpen, name, navTo, icon }) => {
  return (
    <NavLink
      to={navTo}
      className={
        "btn-link " +
        (isNavbarOpen
          ? "justify-start margin-l-16 margin-r-16 margin-b-16"
          : " column justify-center algin-center ")
      }>
      {icon}
      <h6
        className={
          isNavbarOpen ? "margin-l-16" : "margin-t-8 font-xs text-center"
        }>
        {name}
      </h6>
    </NavLink>
  );
};
export const Navbar = ({ isNavbarOpen, setNavbarToggle }) => {
  const navigate = useNavigate();
  const { playlists } = usePlaylist();
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  return (
    <>
      <nav className="row align-center padding-16 w12 justify-between">
        <div className="row">
          <button
            className="btn-link margin-r-16"
            onClick={() => {
              setNavbarToggle(!isNavbarOpen);
            }}>
            <HamBurger />
          </button>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className="row align-center">
          <button className="btn-link margin-r-16" onClick={toggleTheme}>
            {theme !== "DARK" && <Moon />}
            {theme === "DARK" && <Sun />}
          </button>
          {!user && (
            <button
              className="sm-btn-pry-fil margin-r-16"
              onClick={() => navigate("/login")}>
              Login
            </button>
          )}
          {user && (
            <>
              <Avatar image={useDefaultImage} name={user.name} />
              <button className="sm-btn-pry margin-l-16" onClick={logoutUser}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      <Hidden hideAt="sm-up">
        <Model
          isOpenModel={isNavbarOpen}
          setIsOpenModel={setNavbarToggle}></Model>
      </Hidden>
      <aside className={isNavbarOpen ? "expand " : ""}>
        <Hidden hideAt="sm-up">
          <div className="padding-l-16 padding-b-16">
            <Logo />
          </div>
        </Hidden>
        {Object.entries(options).map(([name, option]) => (
          <NavOption
            isNavbarOpen={isNavbarOpen}
            name={name}
            navTo={option.link}
            icon={option.icon}
            key={name}
          />
        ))}
        {playlists.map(
          (playlist) =>
            !commonPlaylist.includes(playlist.name) && (
              <NavOption
                isNavbarOpen={isNavbarOpen}
                name={playlist.name}
                navTo={`playlist/${playlist.name}`}
                icon={<PlaylistIcon />}
                key={playlist.name}
              />
            )
        )}
      </aside>
    </>
  );
};
