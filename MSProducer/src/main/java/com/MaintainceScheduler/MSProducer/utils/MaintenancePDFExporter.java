package com.MaintainceScheduler.MSProducer.utils;

import java.awt.Color;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletResponse;

import com.MaintainceScheduler.MSProducer.model.MaintenanceResponse;
import com.MaintainceScheduler.MSProducer.model.Part;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;


public class MaintenancePDFExporter {
    private List<MaintenanceResponse> maintenanceList;

    public MaintenancePDFExporter(List<MaintenanceResponse> maintenanceResponseList) {
        this.maintenanceList = maintenanceResponseList;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Maintenance ID", font));

        table.addCell(cell);

        cell.setPhrase(new Phrase("Details", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Parts Replaced", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Remarks", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (MaintenanceResponse maintenance : maintenanceList) {
            table.addCell(maintenance.getId());
            table.addCell(maintenance.getMaintenanceDetail());
            table.addCell(partsToString(maintenance.getPartsReplaced()));
            table.addCell(maintenance.getDate().toString());
            table.addCell(maintenance.getRemarks());
        }
    }

    private String partsToString(List<Part> partList) {
        String result = "";
        for (Part p : partList) {
            result += ", " + p.getName();
        }
        result = result.substring(2);
        return result;
    }

    public void export(HttpServletResponse response, Date from, Date to) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);

        Paragraph p1 = new Paragraph("Maintenance Record", font);
        p1.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(p1);

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String dateRange = df.format(from) + " - " + df.format(to);
        font.setSize(12);
        font.setColor(Color.red);
        Paragraph p2 = new Paragraph(dateRange, font);
        p2.setAlignment(Paragraph.ALIGN_RIGHT);
        document.add(p2);

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {2.0f, 3f, 3.0f, 2.0f, 2.5f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        document.close();

    }
}
