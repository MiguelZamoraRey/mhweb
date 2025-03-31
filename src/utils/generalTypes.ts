export interface IChat {
  _id: string;
  from: string;
  conversation: IMessage[];
  tokensConsumed: number;
  status: EnumChatStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum EnumFromMessage {
  BOT = 'BOT',
  USER = 'USER',
}

export enum EnumChatStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  TERMINATED = 'TERMINATED',
  KO = 'KO',
}

export interface IMessage {
  from: EnumFromMessage;
  text: string;
}

export interface IMistralResponse {
  status: EnumMistralResponseStatus;
  isFinished: boolean;
  botMessage: string;
}

export enum EnumMistralResponseStatus {
  OK = 'OK',
  KO = 'KO',
  EXHAUSTED = 'EXHAUSTED',
}
