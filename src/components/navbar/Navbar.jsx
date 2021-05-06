import "./navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { usePlaylistContext } from "../../Context/PlaylistContext";
import { useTheme } from "../../Context/ThemeContext";
import { Model } from "../Model";
import { Hidden } from "../Hidden";
import {
  HomeIcon,
  PlaylistIcon,
  SaveIcon,
  LikeIcon,
  HamBurger,
  Logo,
  Moon,
  Sun,
} from "../../assests/icons";

const NavOption = ({ isNavbarOpen, name, navTo, icon }) => {
  return (
    <NavLink
      to={navTo}
      end={navTo}
      className={
        "btn-link " +
        (isNavbarOpen
          ? "justify-start margin-l-16 margin-r-16 margin-b-16"
          : " column justify-center algin-center")
      }
      activeStyle={{
        color: "var(--primary-default)",
        background: "var(--grey-opac)",
      }}>
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
  const location = useLocation();
  const { playlists } = usePlaylistContext();
  const { theme, toggleTheme } = useTheme();
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
        <div className="row">
          <button className="btn-link margin-r-16" onClick={toggleTheme}>
            {theme !== "DARK" && <Moon />}
            {theme === "DARK" && <Sun />}
          </button>
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
          icon={<HomeIcon isActive={location.pathname === "/"} />}
        />
        <NavOption
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
        />
        <fieldset className=" column padding-t-8">
          {playlists.map((playlist) => (
            <NavOption
              key={playlist.id}
              isNavbarOpen={isNavbarOpen}
              name={playlist.name}
              navTo={`/playlist/${playlist.id}`}
              icon={
                <PlaylistIcon
                  isActive={location.pathname === `/playlist/${playlist.id}`}
                />
              }
            />
          ))}
        </fieldset>
      </aside>
    </>
  );
};
