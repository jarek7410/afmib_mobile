export interface loginDTO {
  email: string | undefined;
  name: string;
  token: string;
}
export interface codejoinDTO {
  code: string;
}
export interface MeDataDto {
  ID: number;
  username: string;
  email: string;
  pid: string;
  name: string;
  surname: string;
}

export interface saveMeDataDto {
  email: string;
  pid: string;
  name: string;
  surname: string;
}

export interface tableJoinDTO {
  section: number;
  table: number;
  round: number;
  is_ns: boolean;
}
export interface tournamentDTO {
  ID: number;
  name: string;
  creator_id: number;
  code_id: number;
}
export interface sendPlayerNamesDTO {
  playerNumbers: sendPlayerNameDTO[];
  section: number;
  table: number;
  round: number;
}
export interface sendPlayerNameDTO {
  direction: string;
  number: string;
  name: string;
}
export interface sendMyPlayerNameDTO {
  name: string;
  surname: string;
  pairNumber: number;
  pid: string;
  isN: boolean;
  isW: boolean;
}
export interface codeWithDate {
  code: string;
  date: Date;
}
export interface messageForHistory {
  ID: string;
  message: string;
  type: string;
  date: Date;
}
export interface messageWS {
  ID: string;
  message: string;
  type: string;
}
export interface movementDTO {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  section: number;
  table: number;
  round: number;
  nsPair: number;
  ewPair: number;
  lowBoard: number;
  highBoard: number;
  customBoards: string;
  customRound: number;
  customSegment: number;
  customNsPair: number;
  customEWPair: number;
}
export interface settings {
  chooseSector: boolean;
  pairJoin: boolean;
  singeJoin: boolean;
  tableJoin: boolean;
  defaultSector: number;
  helloMessage: string;
}
export interface PairStat {
  section: number;
  pair: number;
  rounds: number;
  boards: number;
}
export interface reciveDataDto {
  section: number;
  table: number;
  round: number;
  board: number;
  pairNS: number;
  pairEW: number;
  declarer: number;
  ns: string;
  contract: string;
  result: string;
  leadCard: string;
  remarks: string;
  erased: boolean;
}
