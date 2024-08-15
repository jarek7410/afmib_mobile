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
export interface tableJoinDTO {
  section: number;
  table: number;
  round: number;
  isNS: boolean;
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
