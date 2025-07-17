const prisma = require('../../../services/prisma');
const ExcelJS = require('exceljs');

module.exports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'startDate and endDate are required'
      });
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: {
        customer: true,
        user: true,
        InvoiceItem: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Invoice Report');

    // Header
    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Invoice Code', key: 'invoiceCode', width: 20 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'User', key: 'user', width: 20 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Item(s)', key: 'items', width: 50 },
    ];

    invoices.forEach((invoice, index) => {
      const itemDetails = invoice.InvoiceItem.map(item =>
        `${item.product.name} (${item.quantity}x @${item.price})`
      ).join(', ');

      worksheet.addRow({
        no: index + 1,
        invoiceCode: invoice.invoiceCode,
        date: invoice.date.toISOString().split('T')[0],
        customer: invoice.customer?.name || '-',
        user: invoice.user?.name || '-',
        total: invoice.grandTotal,
        items: itemDetails
      });
    });

    // Styling (optional)
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice_report_${startDate}_to_${endDate}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
