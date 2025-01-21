export interface CodeGroup {
  codeGroup: string;
  name: string;
  description: string;
  codes: Code[];
}

export interface Code {
  code: string;
  name: string;
  label?: string;
}
