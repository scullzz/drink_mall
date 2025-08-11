import { useState, useMemo, ChangeEvent, useEffect } from "react";
import {
  SwipeableDrawer,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ME_QUERY, UPDATE_USER } from "./query";
import { normalizeSex } from "../../../utils/formatData";

type Props = { open: boolean; onClose: () => void; onOpen: () => void };

const MAX_BIO = 300;
const PINK = "#E203A8";
const glowBgStrong = `radial-gradient(circle at 50% 140%, rgba(226,3,168,.9) 0%, rgba(226,3,168,0) 65%)`;

const fieldSx = {
  mb: 2,
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "24px",
    px: 2,
    fontSize: "18px",
    height: "56px",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,.6)" },
};

const textFiledSx = {
  mb: 2,
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "24px",
    px: 2,
    fontSize: "18px",
    height: "160px",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,.6)" },
};

const genderBtn = (active: boolean) => ({
  width: "160px",
  height: "56px",
  textTransform: "none" as const,
  fontWeight: 500,
  fontSize: "1.0625rem",
  borderRadius: "20px",
  py: 1.25,
  borderWidth: "1px",
  borderStyle: "solid",
  lineHeight: 1.2,
  color: "#fff",
  borderColor: active ? PINK : "rgba(226,3,168,.35)",
  background: active ? `${glowBgStrong}, #000` : "#000",
  boxShadow: active ? `0 0 22px 2px rgba(226,3,168,.75)` : "none",
});

const saveBtn = (enabled: boolean) => ({
  width: "100%",
  height: 56,
  borderRadius: 20,
  borderWidth: 1,
  borderStyle: "solid",
  fontSize: 18,
  fontWeight: 500,
  textTransform: "none" as const,
  transition: "all .15s ease",
  opacity: 1,
  ...(enabled
    ? {
      color: PINK,
      borderColor: "transparent",
      background: "#fff",
      boxShadow: "0 0 36px 6px rgba(226,3,168,.7)",
      "&:hover": {
        background: "#fff",
        boxShadow: "0 0 42px 8px rgba(226,3,168,.9)",
      },
    }
    : {
      borderColor: "rgba(226,3,168,.25)",
      background: "#000",
      cursor: "not-allowed",
    }),
  "&.Mui-disabled": {
    color: "rgba(255,255,255,.3)",
    borderColor: "rgba(226,3,168,.25)",
    background: "#000",
    fontSize: 18,
    fontWeight: 500,
  },
});

export default function BottomDrawer({ open, onClose, onOpen }: Props) {
  // Берём текущего пользователя из кэша/сети
  const { data: meData } = useQuery(ME_QUERY);

  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");

  // Автозаполнение при открытии
  useEffect(() => {
    if (!open) return;
    const me = meData?.me;
    if (!me) return;
    setGender(normalizeSex(me.sex));
    setName(me.firstName || "");
    setSurname(me.lastName || "");
    setAge(me.age != null ? String(me.age) : "");
    setBio((me.description || "").slice(0, MAX_BIO));
  }, [open, meData]);

  const valid = useMemo(() => {
    if (!gender || !name.trim() || !surname.trim() || !age.trim() || !bio.trim())
      return false;
    const n = Number(age);
    return !Number.isNaN(n) && n >= 1 && n <= 120;
  }, [gender, name, surname, age, bio]);

  const userId = meData?.me?.id;

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    // оптимистичный апдейт с правильным типом
    optimisticResponse: {
      updateUser: {
        __typename: "UserType",
        id: userId, // важно для связывания сущности в кэше (если сервер отдает id)
        age: Number(age),
        description: bio,
        firstName: name.trim(),
        lastName: surname.trim(),
        sex: gender,
      },
    },
    // сразу подкладываем новые поля в результат ME_QUERY
    update(cache, { data }) {
      const u = data?.updateUser;
      if (!u) return;

      const existing = cache.readQuery<{ me: any }>({ query: ME_QUERY });

      cache.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            __typename: existing?.me?.__typename || "UserType",
            ...(existing?.me || {}),
            ...u, // перезаписываем изменённые поля
            // гарантируем сохранение id, если сервер его не вернул
            id: existing?.me?.id ?? u.id,
          },
        },
      });
    },
    // на случай если бэкенд что-то нормализует/меняет — дотягиваем свежие данные
    refetchQueries: [{ query: ME_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => onClose(),
  });

  const handleSubmit = async () => {
    if (!valid || loading) return;

    await updateUser({
      variables: {
        age: Number(age),
        description: bio,
        firstName: name.trim(),
        lastName: surname.trim(),
        sex: gender, // если сервер ждёт MALE/FEMALE — мапни тут
      },
    });
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen={false}
      PaperProps={{
        sx: {
          backgroundColor: "#141414",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          color: "#fff",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 3, pt: 2, pb: 0, flex: 1 }}>
        <Box
          sx={{
            mx: "auto",
            mb: 2,
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#333",
          }}
        />

        <Typography align="center" sx={{ fontSize: 24, fontWeight: 500, mb: 3 }}>
          Редактировать профиль
        </Typography>

        {/* --- gender buttons --- */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
          <Button disableRipple onClick={() => setGender("male")} sx={genderBtn(gender === "male")}>Парень</Button>
          <Button disableRipple onClick={() => setGender("female")} sx={genderBtn(gender === "female")}>Девушка</Button>
        </Box>

        <TextField
          placeholder="Алексей"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
        />

        <TextField
          placeholder="Трофимов"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
        />

        <TextField
          placeholder="23"
          value={age}
          onChange={(e) => setAge(e.target.value.replace(/[^\d]/g, ""))}
          fullWidth
          required
          sx={fieldSx}
          InputLabelProps={{ shrink: false }}
          inputMode="numeric"
        />

        <TextField
          placeholder="О себе…"
          value={bio}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBio(e.target.value.slice(0, MAX_BIO))
          }
          fullWidth
          multiline
          rows={5}
          required
          sx={textFiledSx}
          helperText={`${bio.length}/${MAX_BIO}`}
          FormHelperTextProps={{ sx: { textAlign: "right", mr: 1, color: "#777" } }}
          InputLabelProps={{ shrink: false }}
        />

        {error && (
          <Typography sx={{ color: "#f55", mt: 1 }}>
            Не удалось сохранить: {error.message}
          </Typography>
        )}
      </Box>

      <Box sx={{ px: 3, pb: 2 }}>
        <Button
          disableRipple
          fullWidth
          disabled={!valid || loading}
          onClick={handleSubmit}
          sx={saveBtn(valid && !loading)}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Сохраняю…" : "Сохранить"}
        </Button>
      </Box>
    </SwipeableDrawer>
  );
}
