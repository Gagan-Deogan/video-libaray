import React, { useState, useEffect } from "react";
import "./navbar.css";
import menuIcon from "../../assests/menu.svg";
import {
  HomeIcon,
  PlaylistIcon,
  HistoryIcon,
  SaveIcon,
  LikeIcon,
} from "../../assests";
import { usePlaylistContext } from "../../Context/PlaylistProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const NavOption = ({ isNavbarOpen, name, navTo, icon, isActive }) => {
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
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  const { playlists } = usePlaylistContext();
  const navigate = useNavigate();
  const handleClose = () => {
    setNavbarToggle();
  };
  return (
    <>
      <nav className="row align-center padding-16 w12 justify-between">
        <button
          className="btn-link"
          onClick={() => {
            setNavbarToggle(!isNavbarOpen);
          }}>
          <img src={menuIcon} alt="" />
        </button>
        <div className="row">
          <button className="sm-btn-pry" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>
      {isNavbarOpen && windowWidth < 700 && (
        <div className="model-container dis pos-f" onClick={handleClose}></div>
      )}
      <aside className={isNavbarOpen ? "expand " : ""}>
        <NavOption
          isNavbarOpen={isNavbarOpen}
          name="Explore"
          navTo="/"
          icon={<HomeIcon isActive={location.pathname === "/"} />}
        />
        <NavOption
          isNavbarOpen={isNavbarOpen}
          name="History"
          navTo="/history"
          icon={<HistoryIcon isActive={location.pathname === "/history"} />}
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
