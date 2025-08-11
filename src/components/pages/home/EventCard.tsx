import React from "react";
import Carousel, { DotProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

export interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  logo?: string;
  cta?: string;
}

const CustomDot: React.FC<DotProps> = ({ onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: active ? "#ffffff" : "rgba(255,255,255,0.3)",
      border: 0,
      margin: "0 6px",
      cursor: "pointer",
    }}
  />
);

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { title, date, time, venue, image, logo, cta = "Подробнее" } = event;
  return (
    <Card elevation={6} sx={{ position: "relative", overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: { xs: 360, md: 460 }, objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {logo && (
        <Box sx={{ position: "absolute", top: 16, left: 16 }}>
          <CardMedia
            component="img"
            image={logo}
            alt="logo"
            sx={{ height: 40 }}
          />
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{ color: "common.white", fontSize: "28px", fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography
            component="span"
            sx={{
              m: 0,
              p: 0,
              color: "rgba(255,255,255,0.8)",
              fontSize: 16,
              fontWeight: 300,
              display: "inline",
            }}
          >
            {date}, {time}
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                marginLeft: "12px",
                marginRight: "12px",
              }}
            >
              •
            </span>
            {venue}
          </Typography>
        </div>

        <Button
          variant="contained"
          sx={{
            width: "132px",
            height: "48px",
            alignSelf: "flex-start",
            bgcolor: "#E203A8",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 4,
            px: 4,
            "&:hover": { bgcolor: "#e60094" },
            fontSize: "16px",
            color: "white",
            boxShadow: "0 0 32px 0 #E30EAC",
          }}
        >
          {cta}
        </Button>
      </Box>
    </Card>
  );
};

export interface EventCarouselProps {
  events: Event[];
  autoPlay?: boolean;
}

const EventCarousel: React.FC<EventCarouselProps> = ({
  events,
  autoPlay = true,
}) => (
  <Box sx={{ position: "relative" }}>
    <Carousel
      responsive={responsive}
      autoPlay={autoPlay}
      autoPlaySpeed={5000}
      infinite
      showDots
      arrows={false}
      keyBoardControl
      itemClass="px-4"
      customTransition="all 500ms"
      containerClass="carousel-container"
      renderDotsOutside={false}
      customDot={<CustomDot />}
      dotListClass="event-carousel-dots"
    >
      {events.map((evt) => (
        <EventCard key={evt.id ?? evt.title} event={evt} />
      ))}
    </Carousel>
  </Box>
);

export default EventCarousel;
