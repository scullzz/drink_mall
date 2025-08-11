import {
  Box,
  Button,
  CardMedia,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { EventItem } from "./EventList";

type DrawerProps = {
  open: boolean;
  event: EventItem | null;
  onClose: () => void;
  onOpen: () => void;
};

const PINK = "#E203A8";
const buttonPink = "#E203A8";
const glowBgStrong =
  "radial-gradient(circle at 50% 140%, rgba(226,3,168,.9) 0%, rgba(226,3,168,0) 65%)";

export const EventDrawer: React.FC<DrawerProps> = ({
  open,
  event,
  onClose,
  onOpen,
}) => {
  if (!event) return null;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        sx: {
          backgroundColor: "#141414",
          color: "#fff",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          p: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 208,
          overflow: "hidden",
          padding: "24px",
        }}
      >
        <CardMedia
          component="img"
          image={event.image}
          alt={event.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
          }}
        />
      </Box>

      <Box sx={{ px: 3, py: "24px", flex: 1, overflowY: "auto" }}>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            fontWeight: 300,
          }}
        >
          {event.date}, {event.time}
        </Typography>
        <Typography
          sx={{
            color: "common.white",
            fontWeight: 500,
            fontSize: "24px",
          }}
        >
          {event.title}
        </Typography>
        {event.venue && (
          <Typography sx={{ color: PINK, fontWeight: 300, mb: 3 }}>
            {event.venue}
          </Typography>
        )}

        {event.headliners && (
          <Typography
            sx={{
              color: "white",
              fontWeight: 500,
              mb: 1,
              fontSize: "18px",
            }}
          >
            Хэдлайнеры: {event.headliners}
          </Typography>
        )}

        {event.description && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 2,
              lineHeight: 1.5,
              fontSize: "16px",
              fontWeight: 300,
            }}
          >
            {event.description}
          </Typography>
        )}
      </Box>

      {typeof event.price === "number" && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Button
            fullWidth
            disableRipple
            sx={{
              height: 56,
              borderRadius: "20px",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "none",
              color: "#fff",
              background: glowBgStrong,
              backgroundColor: buttonPink,
              boxShadow: "0 0 36px 6px rgba(226,3,168,.6)",
              "&:hover": {
                boxShadow: "0 0 42px 8px rgba(226,3,168,.9)",
                backgroundColor: PINK,
              },
            }}
          >
            от {event.price.toLocaleString("ru-RU")} ₽
          </Button>
        </Box>
      )}
    </SwipeableDrawer>
  );
};
