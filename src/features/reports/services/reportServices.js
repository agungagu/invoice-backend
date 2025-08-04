const prisma = require('../../../services/prisma');
const { getTodayRange, getWeekRange, getMonthRange } = require('../../../utils/date');

module.exports = async (range) => {
  if (range === 'daily') {
    const { start, end } = getTodayRange();
    const daily = await prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: start, lte: end } },
    });
    return { daily: daily._sum.grandTotal ?? 0 };
  }

  if (range === 'weekly') {
    const { start, end } = getWeekRange();
    const weekly = await prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: start, lte: end } },
    });
    return { weekly: weekly._sum.grandTotal ?? 0 };
  }

  if (range === 'monthly') {
    const { start, end } = getMonthRange();
    const monthly = await prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: start, lte: end } },
    });
    return { monthly: monthly._sum.grandTotal ?? 0 };
  }

  // Kalau tidak dikasih range atau tidak valid, default: ambil semua
  const { start: todayStart, end: todayEnd } = getTodayRange();
  const { start: weekStart, end: weekEnd } = getWeekRange();
  const { start: monthStart, end: monthEnd } = getMonthRange();

  const [daily, weekly, monthly] = await Promise.all([
    prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: weekStart, lte: weekEnd } },
    }),
    prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      where: { created_at: { gte: monthStart, lte: monthEnd } },
    }),
  ]);

  return {
    daily: daily._sum.grandTotal ?? 0,
    weekly: weekly._sum.grandTotal ?? 0,
    monthly: monthly._sum.grandTotal ?? 0,
  };
};
