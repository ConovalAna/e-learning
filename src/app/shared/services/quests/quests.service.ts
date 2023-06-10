import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QueryClientService, UseMutation, UseQuery } from '@ngneat/query';
import { IChallenge, IScore } from './quests.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const queryKeys = {
  quests: 'quests',
};

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private useQuery = inject(UseQuery);
  private useMutation = inject(UseMutation);
  private queryClient = inject(QueryClientService);

  constructor(private http: HttpClient, public afs: AngularFirestore) {}

  questApiUrl = 'https://localhost:44302/Quests/';

  fetchChanllenges() {
    return this.useQuery(
      [queryKeys.quests],
      () => this.http.get<IChallenge[]>(this.questApiUrl),
      { staleTime: Infinity, retry: 3 }
    );
  }

  getScoreChanges(userId: string) {
    {
      return this.afs.doc<IScore>(`UserScoreModel/${userId}`).valueChanges();
    }
  }
}
