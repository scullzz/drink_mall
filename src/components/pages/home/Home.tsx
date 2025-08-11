import EventCarousel from "./EventCard";
import { EventList } from "./EventList";
import back from "./images/back1.jpg";
import bottomImage from "./images/bottomImageExample.svg";
import logo from "./images/logo.svg";

import { useQuery } from "@apollo/client";
import { PROMOTIONS_QUERY, EVENTS_QUERY } from "./query";
import { formatDateRu, formatTimeRu } from "../../../utils/formatData";
import { Box } from "@mui/material";

const pickDttm = (p: any) => p?.createDttm || p?.updateDttm || null;

const Home = () => {
  // промки для карусели
  const { data: promotionsData } = useQuery(PROMOTIONS_QUERY);

  const mainEvents =
    (promotionsData?.promotions ?? [])
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(pickDttm(b) || 0).getTime() - new Date(pickDttm(a) || 0).getTime()
      )
      .slice(0, 10)
      .map((p: any) => {
        const dttm = pickDttm(p);
        return {
          id: String(p.id),
          title:
            (p.description || "").trim() ||
            (p.club?.name ? `Событие в ${p.club.name}` : "Событие"),
          date: formatDateRu(dttm),
          time: formatTimeRu(dttm),
          venue: p.club?.name || "—",
          image: p.imageUrl || back,
          logo: logo,
        };
      });

  // события для списка
  const { data: eventsData } = useQuery(EVENTS_QUERY);

  const eventsList =
    (eventsData?.events ?? [])
      .slice()
      // ближайшие сначала (по eventDttm)
      .sort(
        (a: any, b: any) =>
          new Date(a?.eventDttm || 0).getTime() - new Date(b?.eventDttm || 0).getTime()
      )
      .map((e: any) => ({
        id: String(e.id),
        title: e.title || "Событие",
        date: formatDateRu(e.eventDttm),
        time: formatTimeRu(e.eventDttm),
        venue: e.club?.name || "—",
        image: e.imageUrl || bottomImage, // бэкап картинка
        logo: logo,
        price: e.price ?? undefined,
        headliners: Array.isArray(e.headliners)
          ? e.headliners.join(", ")
          : e.headliners || "",
        description: e.description || "",
      }));

  return (
    <Box sx={{ pb: "89px" }}>
      <EventCarousel events={mainEvents} />
      <EventList events={eventsList} />
    </Box>
  );
};

export default Home;
