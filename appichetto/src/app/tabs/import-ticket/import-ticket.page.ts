import { Component } from '@angular/core';
import { PdfToTextService } from 'src/app/services/pdf-to-text.service';
import { Ticket } from 'src/app/models/ticket';
import { Router } from '@angular/router';
import { TicketFormatterService } from 'src/app/services/ticket-formatter.service';

@Component({
  selector: 'app-import-ticket',
  templateUrl: 'import-ticket.page.html',
  styleUrls: ['import-ticket.page.scss']
})
export class ImportTicketPage {
  market: string
  importMethod: string

  constructor(
    private pdfToTextService: PdfToTextService,
    private ticketFormatterService: TicketFormatterService,
    private router: Router,
  ) { }

  async readPdf($event) {
    let arrayPdfTicket = await this.pdfToTextService.getPDFText($event.target.files[0])
    let ticket: Ticket = this.ticketFormatterService.formatPdfTicket(arrayPdfTicket)
    this.router.navigateByUrl("tabs/ticket/split", { state: { ticket: ticket } });
  }
}
