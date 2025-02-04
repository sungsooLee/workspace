export function convertDateFormatToFns(dateFormat: string) {
  //console.log('dateFormat', dateFormat, dateFormat.replace(/DD/gi, 'dd'));
  return dateFormat.replace(/DD/gi, 'dd');
}
