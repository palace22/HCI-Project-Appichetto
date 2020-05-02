import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {environment} from '../../environments/environment';
import {InboxMessage} from '../models/inbox-message';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MessagesRepositoryService {
    private messageCollection: AngularFirestoreCollection<InboxMessage>;

    constructor(private firestore: AngularFirestore, private loginService: LoginService) {
        this.messageCollection = this.firestore.collection(environment.firebaseDB.messages) as AngularFirestoreCollection<InboxMessage>;
    }

    sendMessage(from: User, to: User, content: string) {
        const message: InboxMessage = {
            from: from.name,
            to: to.name,
            content: content,
        };
        this.messageCollection.doc(to.email).collection('inbox').doc(Date.now().toString()).set(message);
    }

    async sendMessageFromLoggedUser(to: User, content: string) {
        const loggedUser = await this.loginService.getLoggedUser();
        const message: InboxMessage = {
            from: loggedUser.name,
            to: to.name,
            content: content,
        };
        this.messageCollection.doc(to.email).collection('inbox').doc(Date.now().toString()).set(message);
    }

    async retrieveLoggedUserInbox(): Promise<Observable<InboxMessage[]>> {
        const loggedUser = await this.loginService.getLoggedUser();
        const messages: AngularFirestoreCollection<InboxMessage> = this.messageCollection.doc(loggedUser.email).collection('inbox');
        return messages.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as InboxMessage;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    async deleteMessageOfReceiver(message: InboxMessage) {
        const loggedUser = await this.loginService.getLoggedUser();
        const messageToDelete = this.messageCollection.doc(loggedUser.email).collection('inbox').doc(message.id);
        messageToDelete.delete();
    }
}
