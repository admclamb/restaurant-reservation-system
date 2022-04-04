const OPENING_HOURS = {
  monday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  tuesday: {
    isOpen: false,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  wednesday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  thursday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  friday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  saturday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  sunday: {
    isOpen: true,
    open: "10:30",
    close: "22:30",
    lastCall: "21:30",
  },
  storeIsOpen: function (day) {
    return this[day].isOpen;
  },
};

module.exports = OPENING_HOURS;
