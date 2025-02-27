export interface CodeRole {
  codeGroup: string;
  codeRole: string;
  name: string;
  description: string;
  codes: Code[];
}

export interface Code {
  code: string;
  name: string;
  label: string;
}
