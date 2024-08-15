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
