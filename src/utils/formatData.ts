export const formatRuShort = (iso: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    }).format(d);
};

export const normalizeSex = (s?: string): "male" | "female" | "" => {
    const v = (s || "").toString().toLowerCase();
    if (v === "male" || v === "m" || v === "парень") return "male";
    if (v === "female" || v === "f" || v === "девушка") return "female";
    if (s === "MALE") return "male";
    if (s === "FEMALE") return "female";
    return "";
};

export const formatDateRu = (iso?: string) =>
    iso
        ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(iso))
        : "—";

export const formatTimeRu = (iso?: string) =>
    iso
        ? new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso))
        : "";