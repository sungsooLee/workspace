export interface CodeMaster {
  code: string;
  name: string;
  description: string;
  codes: Code[];
}

export interface Code {
  code: string;
  name: string;
  translation: string;
}
