import { useLayoutEffect, useState } from "react";

export function useTelegram() {
  const [tg, setTg] = useState(() => window.Telegram?.WebApp ?? null);

  useLayoutEffect(() => {
    if (tg) {
      tg.ready();
      return;
    }
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      setTg(webApp);
    }
  }, [tg]);

  return tg;
}
