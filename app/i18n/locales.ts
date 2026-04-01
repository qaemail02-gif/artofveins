export const locales = ["en", "ua"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ua";

export const ui = {
  en: {
    nav: {
      main: "Main",
      contacts: "Contacts",
    },
    home: {
      badge: "Vein Treatment Center",
      title: "Art of Veins",
      subtitle:
        "We specialize in modern, minimally invasive treatments for varicose veins, spider veins, and venous insufficiency — helping you look and feel your best.",
      sliderTitle: "Treatment Options",
      sliderSubtitle: "Browse our range of evidence-based vein treatments below.",
    },
    slider: {
      procedureTime: "Procedure time",
      recovery: "Recovery",
      treatment: "Treatment",
      watchOnYoutube: "Watch on YouTube",
      prev: "← Previous",
      next: "Next →",
    },
    contacts: {
      badge: "Get in Touch",
      title: "Contact Us",
      subtitle:
        "Ready to take the next step? Reach out to schedule a consultation or ask any questions about our treatments.",
      phone: "Phone",
      youtube: "YouTube",
      instagram: "Instagram",
    },
  },
  ua: {
    nav: {
      main: "Головна",
      contacts: "Контакти",
    },
    home: {
      badge: "Центр лікування вен",
      title: "Art of Veins",
      subtitle:
        "Ми спеціалізуємося на сучасних, мінімально інвазивних методах лікування варикозних вен, судинних зірочок та венозної недостатності — допомагаємо вам виглядати та почуватися найкраще.",
      sliderTitle: "Методи лікування",
      sliderSubtitle: "Перегляньте наш спектр науково обґрунтованих методів лікування вен.",
    },
    slider: {
      procedureTime: "Тривалість процедури",
      recovery: "Відновлення",
      treatment: "Процедура",
      watchOnYoutube: "Дивитись на YouTube",
      prev: "← Назад",
      next: "Далі →",
    },
    contacts: {
      badge: "Зв'яжіться з нами",
      title: "Контакти",
      subtitle:
        "Готові зробити наступний крок? Зв'яжіться з нами, щоб записатися на консультацію або поставити запитання про наші процедури.",
      phone: "Телефон",
      youtube: "YouTube",
      instagram: "Instagram",
    },
  },
} satisfies Record<Locale, object>;
