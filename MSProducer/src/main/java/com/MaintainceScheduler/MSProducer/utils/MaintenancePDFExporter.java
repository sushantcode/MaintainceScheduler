package com.MaintainceScheduler.MSProducer.utils;

import java.awt.Color;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletResponse;

import com.MaintainceScheduler.MSProducer.model.MachineResponse;
import com.MaintainceScheduler.MSProducer.model.MaintenanceResponse;
import com.MaintainceScheduler.MSProducer.model.Part;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;


public class MaintenancePDFExporter {
    private List<MaintenanceResponse> maintenanceList;
    private MachineResponse machineResponse;

    public MaintenancePDFExporter(List<MaintenanceResponse> maintenanceResponseList, MachineResponse machineResponse) {
        this.maintenanceList = maintenanceResponseList;
        this.machineResponse = machineResponse;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("S.N.", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Details", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Parts Replaced", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Date", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Employee", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Remarks", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        Integer c = 1;
        for (MaintenanceResponse maintenance : maintenanceList) {
            table.addCell(c.toString());
            table.addCell(maintenance.getMaintenanceDetail());
            table.addCell(partsToString(maintenance.getPartsReplaced()));
            table.addCell(maintenance.getDate().toString());
            table.addCell(maintenance.getUsername());
            table.addCell(maintenance.getRemarks());
            c++;
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

        String p2_str = "";
        p2_str += "Machine Name: " + machineResponse.getName() + "\n";
        p2_str += "Machine Specification: " + machineResponse.getSpecification();
        font.setSize(12);
        font.setColor(Color.black);
        Paragraph p2 = new Paragraph(p2_str, font);
        p2.setAlignment(Paragraph.ALIGN_LEFT);
        document.add(p2);

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String dateRange = df.format(from) + " - " + df.format(to);
        font.setSize(10);
        font.setColor(Color.red);
        Paragraph p3 = new Paragraph(dateRange, font);
        p3.setAlignment(Paragraph.ALIGN_RIGHT);
        document.add(p3);

        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {0.75f, 3.0f, 3f, 1.5f, 1.5f, 2.5f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        document.close();

    }
}
