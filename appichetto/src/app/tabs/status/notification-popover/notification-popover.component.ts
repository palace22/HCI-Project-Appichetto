import {Component, OnInit} from '@angular/core';
import {InboxMessage} from '../../../models/inbox-message';
import {Observable} from 'rxjs';
import {MessagesRepositoryService} from '../../../repositories/messages-repository.service';

@Component({
    selector: 'app-notification-popover',
    templateUrl: './notification-popover.component.html',
    styleUrls: ['./notification-popover.component.scss'],
})
export class NotificationPopoverComponent implements OnInit {

    messagesObs: Observable<InboxMessage[]>;
    messages: InboxMessage[];

    constructor(private messagesRepositoryService: MessagesRepositoryService) {
    }

    ngOnInit() {
        this.messagesRepositoryService.retrieveLoggedUserInbox().then(obs => {
            this.messagesObs = obs;
            this.messagesObs.subscribe(messagesArray => {
                this.messages = messagesArray.reverse();
                messagesArray.forEach(m => this.messagesRepositoryService.setMessageAsDisplayed(m));
            });
        });

    }

    delete(message: InboxMessage) {
        console.log(message);
        this.messagesRepositoryService.deleteMessageOfReceiver(message);
    }
}
