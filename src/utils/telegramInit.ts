import { useEffect } from "react";

function useTelegramWebAppInit() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.expand();

    tg.MainButton?.setParams({
      text: "Сохранить",
      color: "#FFFFFF",
      text_color: "#000000",
    });

    tg.MainButton?.hide();

    tg.setBackgroundColor("#FFFFFF");
    tg.setHeaderColor("#229ED9");
  }, []);
}

export default useTelegramWebAppInit;
