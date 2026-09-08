export type Dictionary = {
  meta: { title: string; description: string };
  cover: {
    coupleNames: string;
    invitationLabel: string;
    dateLine: string;
    tapToOpen: string;
  };
  intro: {
    bismillah: string;
    verse: string;
    invitation: string;
    dateSentence: string;
  };
  countdown: {
    heading: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  events: {
    heading: string;
    wedding: {
      title: string;
      dateLabel: string;
      timeLabel: string;
      venueName: string;
      venueSubName: string;
      addressLabel: string;
      mapNote: string;
      mapCtaLabel: string;
    };
  };
  blessing: {
    heading: string;
    prayer: string;
    message: string;
  };
  closing: {
    message: string;
  };
  languageSwitcher: {
    label: string;
  };
};

export type Lang = "en" | "fr" | "ar";
