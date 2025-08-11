import React, { useState, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate, useLocation } from "react-router-dom";

const pages = [
  { icon: <HomeRoundedIcon />, path: "/" },
  { icon: <FavoriteRoundedIcon />, path: "/favorites" },
  { icon: <ChatBubbleRoundedIcon />, path: "/chat" },
  { icon: <PersonRoundedIcon />, path: "/profile" },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIdx = pages.findIndex((p) => p.path === location.pathname);
  const [value, setValue] = useState(currentIdx === -1 ? 0 : currentIdx);

  useEffect(() => {
    setValue(currentIdx === -1 ? 0 : currentIdx);
  }, [location, currentIdx]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(pages[newValue].path);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 12,                    // ⬇️ сама панель чуть ниже
        left: "50%",
        transform: "translateX(-50%)",
        width: 232,
        height: 64,
        borderRadius: "48px",
        zIndex: (t) => t.zIndex.appBar + 1,

        /* 🔥 подсветка ниже и уже */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "105px -120px -136px",  // top 24  | right -80 | bottom -96 | left -80
          borderRadius: "inherit",
          background: "rgba(226,3,168,0.65)",
          filter: "blur(78px)",
          pointerEvents: "none",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          px: 4,
          borderRadius: "48px",
          backdropFilter: "blur(24px)",
          background: "rgba(0,0,0,0.20)",
          boxShadow: "0 1px 4px 0 #ffffff10 inset",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          "&::before": { display: "none" },
          "&::after": { display: "none" },
        }}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels={false}
          sx={{
            width: "100%",
            bgcolor: "transparent",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {pages.map((page, index) => (
            <BottomNavigationAction
              key={page.path}
              disableRipple
              icon={page.icon}
              sx={{
                position: "relative",
                flexGrow: 1,
                minWidth: 0,
                gap: 8,
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                  transition: "color .25s ease",
                  color:
                    value === index
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.45)",
                },
                "& .MuiBottomNavigationAction-label": { display: "none" },
                "&.Mui-focusVisible": { outline: "none" },

                "&.Mui-selected::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  top: "62%",
                  transform: "translate(-50%, 0)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse 110% 120% at center bottom, rgba(226,3,168,0.55) 10%, rgba(226,3,168,0.25) 45%, rgba(226,3,168,0) 120%)",
                  filter: "blur(12px)",
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navigation;
