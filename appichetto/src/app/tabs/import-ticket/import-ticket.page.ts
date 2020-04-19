import { Component, ViewChild } from '@angular/core';
import { PdfToTextService } from 'src/app/services/pdf-to-text.service';
import { Ticket } from 'src/app/models/ticket';
import { Router } from '@angular/router';
import { TicketFormatterService } from 'src/app/services/ticket-formatter.service';
import { User } from 'src/app/models/user';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-import-ticket',
  templateUrl: 'import-ticket.page.html',
  styleUrls: ['import-ticket.page.scss']
})
export class ImportTicketPage {
  market: string
  importMethod: string
  participans: User[]

  constructor(
    private pdfToTextService: PdfToTextService,
    private ticketFormatterService: TicketFormatterService,
    private router: Router,
  ) { }

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  async readPdf($event) {
    let arrayPdfTicket = await this.pdfToTextService.getPDFText($event.target.files[0])
    let ticket: Ticket = this.ticketFormatterService.formatPdfTicket(arrayPdfTicket)
    this.router.navigateByUrl("tabs/ticket/split", { state: { ticket: ticket } });
  }

  hasMarketAndMethodSelected() {
    return this.market !== (undefined || "") && this.importMethod !== (undefined || "") && this.participans.length !== 0
  }


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };
}
