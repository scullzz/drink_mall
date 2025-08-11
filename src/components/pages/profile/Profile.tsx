import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Header from "../../Header";
import BottomDrawer from "./BottomDriver";
import { useQuery } from "@apollo/client";
import { GIFTS_RECEIVED_QUERY, ME_QUERY } from "./query";
import { formatRuShort } from "../../../utils/formatData";
import { useTelegram } from "../../../utils/telegramHook";

export default function Profile() {
  const tg = useTelegram();
  const { data } = useQuery(ME_QUERY)
  const {
    data: giftsData,
  } = useQuery(GIFTS_RECEIVED_QUERY);

  const user = {
    avatar: tg.initDataUnsafe?.user?.photo_url,
    handle: data?.me?.username || "—",
    fullName: [data?.me?.firstName, data?.me?.lastName].filter(Boolean).join(" ") || "—",
    age: data?.me?.age ?? "—",
    bio: data?.me?.description || "—",
  };

  const gifts =
    (giftsData?.giftsReceived || [])
      .map((g: any) => g?.giftItem)
      .filter(Boolean)
      .map((item: any) => ({
        id: item.id ?? `${item.name}-${item.createDttm}`,
        title: item.name ?? "—",
        date: formatRuShort(item.createDttm),
        image: item.imageUrl,
      }));
      
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ pb: "116px" }}>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#000",
          color: "#fff",
          px: 3,
          pt: 2,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Avatar
            src={user.avatar}
            alt={user.fullName}
            sx={{ width: 120, height: 120, mb: 1 }}
          />

          <Typography
            variant="body2"
            sx={{ color: "#E203A8", fontWeight: 300, fontSize: "18px" }}
          >
            @{user.handle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "125%" }}
            >
              {user.fullName}
            </Typography>
            <IconButton
              sx={{
                color: "#9e9e9e",
                width: 48,
                height: 48,
              }}
              size="medium"
              onClick={() => setDrawerOpen(true)}
            >
              <EditRoundedIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <Typography variant="subtitle1" sx={{ color: "#9e9e9e", mb: 2 }}>
            {user.age} года
          </Typography>

          <Divider sx={{ borderColor: "#212121", mb: 2 }} />
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 4, fontSize: "16px", fontWeight: 300 }}
        >
          {user.bio}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 500, mb: 2, fontSize: "20px" }}
        >
          Мои подарки
        </Typography>

        <Grid container spacing={2}>
          {gifts.map((gift: any) => (
            <Grid item key={gift.id} xs={6} sm={4} md={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 0 8px rgba(0,0,0,0.4)",
                }}
              >
                <Box
                  component="img"
                  src={gift.image}
                  alt={gift.title}
                  sx={{ width: "100%", height: 158 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: "16px", fontWeight: 300 }}
                  >
                    {gift.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9e9e9e",
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 300,
                    }}
                  >
                    {gift.date}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <BottomDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        />
      </Box>
    </Box>
  );
}