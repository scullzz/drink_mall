import React, { useState, useMemo } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  List,
  ListItem,
  Divider,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { EventDrawer } from "./BottomEventDriver";

// -------------------- types --------------------
export interface EventItem {
  id?: string;
  title: string;
  date: string;
  time: string;
  price?: number;
  image: string;
  venue?: string;
  headliners?: string;
  description?: string;
}

interface EventListProps {
  events: EventItem[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filtered = useMemo(() => {
    if (!query) return events;
    const q = query.toLowerCase();
    return events.filter((e) => e.title.toLowerCase().includes(q));
  }, [events, query]);

  const handleSelect = (ev: EventItem) => {
    setSelectedEvent(ev);
    setDrawerOpen(true);
  };

  return (
    <>
      <Box sx={{ mt: 4, px: 3 }}>
        <TextField
          fullWidth
          placeholder="Поиск по событиям"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            height: 56,
            bgcolor: "rgba(255,255,255,0.06)",
            borderRadius: 3,
            input: { color: "common.white", px: 2, py: 2 },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
              </InputAdornment>
            ),
          }}
        />

        <List disablePadding sx={{ mt: 3 }}>
          {filtered.map((ev, idx) => (
            <React.Fragment key={ev.id ?? idx}>
              <ListItem
                disableGutters
                onClick={() => handleSelect(ev)}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  py: 2.5,
                  cursor: "pointer",
                  "&:active": { opacity: 0.7 },
                }}
              >
                <Box sx={{ pr: 2, maxWidth: "65%" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      mb: 0.5,
                      fontSize: "12px",
                      fontWeight: 300,
                    }}
                  >
                    {ev.date}, {ev.time}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "common.white",
                      fontWeight: 500,
                      mb: 0.5,
                      lineHeight: 1.1,
                      fontSize: "18px",
                    }}
                  >
                    {ev.title}
                  </Typography>
                  {typeof ev.price === "number" && (
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      от {ev.price.toLocaleString("ru-RU")} ₽
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    width: 160,
                    minWidth: 120,
                    height: 90,
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={ev.image}
                    alt={ev.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              </ListItem>

              {idx < filtered.length - 1 && (
                <Divider
                  variant="fullWidth"
                  sx={{ bgcolor: "rgba(164,84,255,0.25)", mx: 0 }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <EventDrawer
        open={drawerOpen}
        event={selectedEvent}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
    </>
  );
};
