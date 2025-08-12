import { useEffect } from "react";

function useTelegramWebAppInit() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;
    tg.expand();
    tg.LocationManager.init(() => {
      tg.LocationManager.getLocation((loc) => {
        if (loc) {
          const { latitude, longitude } = loc;
          alert(latitude + " " + longitude);
        }
      });
    });

    tg.MainButton?.setParams({
      text: "Сохранить",
      color: "#FFFFFF",
      text_color: "#000000",
    });

    tg.MainButton?.hide();

    tg.setBackgroundColor("#FFFFFF");
    tg.setHeaderColor("#E203A8");
  }, []);
}

export default useTelegramWebAppInit;
