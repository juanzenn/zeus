export const TIME_LIMITS = [
  {
    groupLabel: "By Minutes",
    options: [
      { value: 60, label: "1 min" },
      { value: 60 * 5, label: "5 min" },
      { value: 60 * 10, label: "10 min" },
      { value: 60 * 15, label: "15 min" },
      { value: 60 * 30, label: "30 min" },
    ],
  },
  {
    groupLabel: "By Hours",
    options: [
      { value: 3600, label: "1 hour" },
      { value: 3600 * 4, label: "4 hours" },
      { value: 3600 * 8, label: "8 hours" },
      { value: 3600 * 12, label: "12 hours" },
      { value: 86400, label: "24 hours" },
    ],
  },
  {
    groupLabel: "By Days",
    options: [
      { value: 86400 * 2, label: "2 days" },
      { value: 86400 * 3, label: "3 days" },
      { value: 86400 * 7, label: "7 days" },
    ],
  },
];
