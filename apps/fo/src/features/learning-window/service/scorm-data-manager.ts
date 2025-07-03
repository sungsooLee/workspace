export class ScormDataManager {
  calls: any[] = [];
  elements: any = {};
  errmgr: any = {};
  validrequests = {};

  constructor(errmgr: any) {
    this.errmgr = errmgr;
  }

  fromJSON(dmjs: any) {
    if (dmjs.elems) {
      this.elements = dmjs.elems;
    }
    if (dmjs.validrequests) {
      this.validrequests = dmjs.validrequests;
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
      if (ret === undefined) {
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
