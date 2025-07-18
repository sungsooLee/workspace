import { ProcessingStatus } from '@types';

export const isProcessingNone = (status: ProcessingStatus) =>
  !status || status === ProcessingStatus.NONE;

export const isProcessing = (status: ProcessingStatus) =>
  Boolean(status) &&
  ![ProcessingStatus.COMPLETE, ProcessingStatus.FAIL, ProcessingStatus.NONE].includes(status);

export const isProcessingFailed = (status: ProcessingStatus) =>
  Boolean(status) && status === ProcessingStatus.FAIL;

export const isProcessingCompleted = (status: ProcessingStatus) =>
  Boolean(status) && status === ProcessingStatus.COMPLETE;
