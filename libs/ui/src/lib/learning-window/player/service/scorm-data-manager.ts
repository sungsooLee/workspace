const defaultCmi = {
  'cmi._version': '1.0',
  'cmi.learner_preference._children': 'delivery_speed,language,audio_level,audio_captioning',
  'cmi.objectives._children':
    'score,id,progress_measure,completion_status,description,success_status',
};
export class ScormDataManager {
  calls: any[] = [];
  elements: any = {};
  errmgr: any = {};
  validrequests = {};

  constructor(errmgr: any) {
    this.errmgr = errmgr;
  }

  fromJSON(dmjs: any) {
    if (dmjs.objectInfo) {
      this.elements = { ...defaultCmi, ...dmjs.objectInfo };
      console.log('dmjs', dmjs);
      console.log('elements', this.elements);
    }
  }
  calllist() {
    return this.calls;
  }

  clearcalllist() {
    this.calls = [];
  }

  getValue(element: string) {
    let ret = '';
    try {
      ret = this.elements[element];
      if (ret === undefined || ret === null) {
        this.errmgr.setCurrentErrorCode(403);
        ret = '';
      }
      this.errmgr.clearCurrentErrorCode();
    } catch (e) {
      this.errmgr.setCurrentErrorCode(301);
    }
    return ret;
  }

  setValue(element: string, value: string) {
    this.errmgr.clearCurrentErrorCode();
    this.calls.push([element, value]);
    this.elements[element] = value;
  }
}
