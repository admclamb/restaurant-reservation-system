export const OPENING_HOURS = {
  mon: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  tue: {
    isOpen: false,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  wed: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  thu: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  fri: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  sat: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  sun: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  storeIsOpen: function (day) {
    return this[day].isOpen;
  },
};
