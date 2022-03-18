export const OPENING_HOURS = {
  mon: {
    isOpen: true,
  },
  tue: {
    isOpen: false,
  },
  wed: {
    isOpen: true,
  },
  thu: {
    isOpen: true,
  },
  fri: {
    isOpen: true,
  },
  sat: {
    isOpen: true,
  },
  sun: {
    isOpen: true,
  },
  storeIsOpen: function (day) {
    return this[day].isOpen;
  },
};
