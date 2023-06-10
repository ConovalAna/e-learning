import { Timestamp } from 'firebase/firestore';

export interface IChallenge {
  id: string;
  type: ChallengeType;
  pass: boolean;
  userId: string;
  startDate: string;
  quests: IQuest[];
}

export interface IQuest {
  questName: string;
  total: number;
  pass: number;
}

enum ChallengeType {
  Daily = 0,
  Weekly = 1,
}

export type QuestType = {
  Name2: '';
};

export interface IDailyScore {
  Date: Timestamp;
  Score: number;
}

export interface IScore {
  TotalScore: number;
  DailyScores: IDailyScore[];
}
