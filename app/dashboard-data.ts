export const weeklyHours = [
  { day: "Mon", hours: 240 },
  { day: "Tue", hours: 280 },
  { day: "Wed", hours: 320 },
  { day: "Thu", hours: 260 },
  { day: "Fri", hours: 184 },
];

export const totalWeeklyHours = weeklyHours.reduce((sum, day) => sum + day.hours, 0);
export const maxDailyHours = Math.max(...weeklyHours.map(day => day.hours));
