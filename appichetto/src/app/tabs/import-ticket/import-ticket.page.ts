import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { PdfToTextService } from 'src/app/services/pdf-to-text.service';
import { TicketFormatterService } from 'src/app/services/ticket-formatter.service';

@Component({
  selector: 'app-import-ticket',
  templateUrl: 'import-ticket.page.html',
  styleUrls: ['import-ticket.page.scss']
})
export class ImportTicketPage {
  market: string
  method: string
  participants: User[]

  constructor(
    private loginService: LoginService,
    private pdfToTextService: PdfToTextService,
    private ticketFormatterService: TicketFormatterService,
    private router: Router,
  ) {
    this.participants = new Array<User>()
  }

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  async importTicket() {
    let ticket: Ticket = {
      products: [],
      totalPrice: 0,
      paidPrice: 0,
    }
    if (this.method === "manual")
      await this.navigateToSplitTicket(ticket)
  }

  async readPdf($event) {
    let arrayPdfTicket = await this.pdfToTextService.getPDFText($event.target.files[0])
    let ticket: Ticket = this.ticketFormatterService.formatPdfTicket(arrayPdfTicket)
    await this.navigateToSplitTicket(ticket)
  }

  async navigateToSplitTicket(ticket: Ticket) {
    this.loginService.getLoggedUser().then(owner => {
      ticket.owner = owner
      ticket.market = this.market
      this.participants.push(ticket.owner)
      ticket.participants = this.participants
      ticket.timestamp = Date.now()
      ticket.id = Date.now().toString()
      this.router.navigateByUrl("tabs/ticket/split", { state: { ticket: ticket } });
    })
  }

  hasMarketAndMethodSelected() {
    return this.market !== (undefined && "") && this.method !== (undefined && "") && this.participants.length !== 0
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
