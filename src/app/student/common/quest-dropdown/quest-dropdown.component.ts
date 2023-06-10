import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IChallenge, QuestService } from 'src/app/shared/services/quests';

@Component({
  selector: 'app-quest-dropdown',
  templateUrl: './quest-dropdown.component.html',
  styleUrls: ['./quest-dropdown.component.scss'],
})
export class QuestDropdownComponent {
  challenges?: IChallenge[];

  constructor(private router: Router, private questService: QuestService) {
    this.questService.fetchChanllenges().result$.subscribe((fetchedQuests) => {
      this.challenges = fetchedQuests.data;
    });
  }

  getText(questName: string) {
    switch (questName) {
      case 'TestModel':
        return 'Try to pass tests';
      case 'LessonModel':
        return 'Learn lessons';
      case 'QuestModel':
        return 'Try to pass all daily quests';
      default:
        return "You should do something but we don't know what";
    }
  }
}
