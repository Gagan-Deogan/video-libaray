import "./navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
} from "assests/icons";
import useDefaultImage from "assests/images/dp.png";
const NavOption = ({ isNavbarOpen, name, navTo, icon }) => {
  return (
    <NavLink
      to={navTo}
      className={
        "btn-link " +
        (isNavbarOpen
          ? "justify-start margin-l-16 margin-r-16 margin-b-16"
          : " column justify-center algin-center")
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

const optionsIcons = {
  "Saved Videos": <SaveIcon />,
  "Liked Videos": <LikeIcon />,
};

export const Navbar = ({ isNavbarOpen, setNavbarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playlists } = usePlaylist();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
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
          {user && <Avatar image={useDefaultImage} name={user.name} />}
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
        <NavOption
          isNavbarOpen={isNavbarOpen}
          name="Explore"
          navTo="/"
          icon={<HomeIcon />}
        />
        {/* <NavOption
          isNavbarOpen={isNavbarOpen}
          name="Saved Videos"
          navTo="/savedvideos"
          icon={<SaveIcon isActive={location.pathname === "/savedvideos"} />}
        />
        <NavOption
          isNavbarOpen={isNavbarOpen}
          name="Liked Videos"
          navTo="/likedvideos"
          icon={<LikeIcon isActive={location.pathname === "/likedvideos"} />}
        /> */}
        {playlists.map((playlist) => (
          <NavOption
            key={playlist._id}
            isNavbarOpen={isNavbarOpen}
            name={playlist.name}
            navTo={`/playlist/${playlist.name}`}
            icon={
              optionsIcons[playlist.name] ?? <PlaylistIcon />
              // <PlaylistIcon
              //   isActive={location.pathname === `/playlist/${playlist._id}`}
              // />
            }
          />
        ))}
      </aside>
    </>
  );
};
