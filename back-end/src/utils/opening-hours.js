const OPENING_HOURS = {
  mon: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  tue: {
    isOpen: false,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  wed: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  thu: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  fri: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  sat: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  sun: {
    isOpen: true,
    open: "10:30",
    close: "21:30",
    lastCall: "20:30",
  },
  storeIsOpen: function (day) {
    return this[day].isOpen;
  },
};

module.exports = OPENING_HOURS;
