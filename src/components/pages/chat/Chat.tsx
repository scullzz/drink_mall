import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Header from "../../Header";

const COLORS = {
  bg: "#000000",  
  defMessageBg: '#0D0D0D',
  messageBg: "#FFFFFF33",
  text: "#FFFFFF",
  subtle: "rgba(255,255,255,0.6)",
};

const AVATAR_SIZE = 40;
const formatDate = (date: Date) =>
  date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

interface BubbleProps {
  children: React.ReactNode;
  time: string;
  isOwn: boolean;
}

const MessageBubble = ({ children, time, isOwn }: BubbleProps) => (
  <Paper
    elevation={0}
    sx={{
      backgroundColor: isOwn ? COLORS.messageBg : COLORS.defMessageBg,
      color: COLORS.text,
      px: 2,
      py: 1.5,
      borderRadius: 3,
      position: "relative",
    }}
  >
    {children}
    <Typography
      variant="caption"
      sx={{
        position: "absolute",
        right: 12,
        bottom: 8,
        color: COLORS.subtle,
      }}
    >
      {time}
    </Typography>
  </Paper>
);

export default function Chat() {
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      user: { name: "Алексей Трофимов", avatar: "https://i.pravatar.cc/40?img=3" },
      text: "Приглашаю всех на танцпол прямо сейчас!",
      createdAt: new Date("2025-06-19T19:46:00"),
    },
    {
      id: 2,
      user: { name: "Алексей Трофимов", avatar: "https://i.pravatar.cc/40?img=3" },
      text: "Повторяю: танцпол ждёт!",
      createdAt: new Date("2025-06-19T19:46:10"),
    },
    {
      id: 3,
      user: { name: "Елена Варинова", avatar: "https://i.pravatar.cc/40?img=5" },
      text: "Кто хочет познакомиться?",
      createdAt: new Date("2025-06-20T19:46:00"),
    },
    {
      id: 4,
      user: { name: "Незнакомец у бара", avatar: "https://i.pravatar.cc/40?img=8" },
      text: "Те, кто сейчас на баре — бегом к нам!",
      createdAt: new Date("2025-06-20T19:46:30"),
    },
  ]);

  const [value, setValue] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  const grouped = useMemo(() => {
    return messages.reduce((acc, msg) => {
      const key = formatDate(msg.createdAt);
      acc[key] = acc[key] ? [...acc[key], msg] : [msg];
      return acc;
    }, {} as Record<string, typeof messages>);
  }, [messages]);

  const send = () => {
    if (!value.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: { name: "Вы", avatar: "https://i.pravatar.cc/40" },
        text: value.trim(),
        createdAt: new Date(),
      },
    ]);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      sx={{ backgroundColor: COLORS.bg, color: COLORS.text, pb: "89px" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", pb: 2 }}
      >
        <Header />
        <Typography sx={{ fontSize: 24, fontWeight: 500, pl: 3 }}>
          Общий чат
        </Typography>
      </Box>

      <Box ref={logRef} sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        {Object.entries(grouped).map(([day, msgs]) => (
          <Box key={day} sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: COLORS.subtle,
                mb: 1,
              }}
            >
              {day}
            </Typography>

            {msgs.map((m, idx) => {
              const isOwn = m.user.name === "Вы";
              const next = msgs[idx + 1];
              const showAvatar = !next || next.user.name !== m.user.name;

              return (
                <Stack
                  key={m.id}
                  direction="row"
                  spacing={2}
                  sx={{ mb: 0.5, alignItems: "flex-end" }}
                >
                  {showAvatar ? (
                    <Avatar
                      src={m.user.avatar}
                      alt={m.user.name}
                      sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                    />
                  ) : (
                    <Box sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }} />
                  )}

                  <Box flex={1}>
                    <MessageBubble time={formatTime(m.createdAt)} isOwn={isOwn}>
                      {(!idx || msgs[idx - 1].user.name !== m.user.name) && (
                        <Typography
                          sx={{ color: COLORS.subtle }}
                        >
                          {m.user.name}
                        </Typography>
                      )}
                      <Typography variant="body1">{m.text}</Typography>
                    </MessageBubble>
                  </Box>
                </Stack>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box sx={{ px: 3, pt: 0 }}>
        <Paper
          elevation={0}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: COLORS.defMessageBg,
            borderRadius: 4,
            pl: 3,
            pr: "15px",
            height: '56px'
          }}
        >
          <InputBase
            multiline
            maxRows={3}
            placeholder="Сообщение…"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              flex: 1,
              fontSize: 18,
              fontWeight: 300,
              color: COLORS.text,
              "&::placeholder": {
                color: COLORS.subtle,
              },
            }}
          />

          <IconButton type="submit">
            <SendIcon sx={{ fontSize: 24, color: value ? COLORS.text : COLORS.subtle }} />
          </IconButton> 
        </Paper>
      </Box>
    </Box>
  );
}
