export interface MutateCallback<TVariables> {
  onSuccess?: (data: any, variables: TVariables, context: any) => void;
  onSettled?: (
    data: any | undefined,
    error: any | null,
    variables: TVariables,
    context: any | undefined,
  ) => void;
  onError?: (err: any, variables: TVariables, context: any | undefined) => void;
}
