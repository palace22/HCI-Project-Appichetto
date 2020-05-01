import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {environment} from '../../environments/environment';
import {mergeMapTo} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private afMessaging: AngularFireMessaging) {
        afMessaging.usePublicVapidKey('BBdCoTXITEpcwKckuPuvzzDq7eA73pIRKZL-ac1g3gwkb2sxPLb3QDyFRHQc9-K4W49wp4OlQMpSiLGAiPibkLQ');

        this.afMessaging.requestPermission
            .pipe(mergeMapTo(this.afMessaging.tokenChanges))
            .subscribe(
                (token) => { console.log('Permission granted! Save to the server!', token); },
                (error) => { console.error(error); },
            );
    }

}
