export class ScormErrorManager {
  currentErrorCode = '0';
  errors: any = {
    '0': {
      code: '0',
      description: 'No Error',
      diagnostic: 'No Error',
    },
    '101': {
      code: '101',
      description: 'General Exception',
      diagnostic: 'General Exception',
    },
    '102': {
      code: '102',
      description: 'General Initialization Error',
      diagnostic: 'General Initialization Error',
    },
    '103': {
      code: '103',
      description: 'Already Initialized',
      diagnostic: 'Already Initialized',
    },
    '104': {
      code: '104',
      description: 'Content Instance Terminated',
      diagnostic: 'Content Instance Terminated',
    },
    '111': {
      code: '111',
      description: 'General Termination Failure',
      diagnostic: 'General Termination Failure',
    },
    '112': {
      code: '112',
      description: 'Termination Before Initialization',
      diagnostic: 'Termination Before Initialization',
    },
    '113': {
      code: '113',
      description: 'Termination After Termination',
      diagnostic: 'Termination After Termination',
    },
    '122': {
      code: '122',
      description: 'Retrieve Data Before Initialization',
      diagnostic: 'Retrieve Data Before Initialization',
    },
    '123': {
      code: '123',
      description: 'Retrieve Data After Termination',
      diagnostic: 'Retrieve Data After Termination',
    },
    '132': {
      code: '132',
      description: 'Store Data Before Initialization',
      diagnostic: 'Store Data Before Initialization',
    },
    '133': {
      code: '133',
      description: 'Store Data After Termination',
      diagnostic: 'Store Data After Termination',
    },
    '142': {
      code: '142',
      description: 'Commit Before Initialization',
      diagnostic: 'Commit Before Initialization',
    },
    '143': {
      code: '143',
      description: 'Commit After Termination',
      diagnostic: 'Commit After Termination',
    },
    '201': {
      code: '201',
      description: 'General Argument Error',
      diagnostic: 'General Argument Error',
    },
    '301': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'General Get Failure',
    },
    '351': {
      code: '351',
      description: 'General Set Failure',
      diagnostic: 'General Set Failure',
    },
    '391': {
      code: '391',
      description: 'General Commit Failure',
      diagnostic: 'General Commit Failure',
    },
    '401': {
      code: '401',
      description: 'Undefined Data Model Element',
      diagnostic: 'Undefined Data Model Element',
    },
    '402': {
      code: '402',
      description: 'Unimplemented Data Model Element',
      diagnostic: 'Unimplemented Data Model Element',
    },
    '403': {
      code: '403',
      description: 'Data Model Element Value Not Initialized',
      diagnostic: 'Data Model Element Value Not Initialized',
    },
    '404': {
      code: '404',
      description: 'Data Model Element Is Read Only',
      diagnostic: 'Data Model Element Is Read Only',
    },
    '405': {
      code: '405',
      description: 'Data Model Element Is Write Only',
      diagnostic: 'Data Model Element Is Write Only',
    },
    '406': {
      code: '406',
      description: 'Data Model Element Type Mismatch',
      diagnostic: 'Data Model Element Type Mismatch',
    },
    '407': {
      code: '407',
      description: 'Data Model Element Value Out Of Range',
      diagnostic: 'Data Model Element Value Out Of Range',
    },
    '408': {
      code: '408',
      description: 'Data Model Dependency Not Established',
      diagnostic: 'Data Model Dependency Not Established',
    },
    '1000': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'Does Not Have Children',
    },
    '1001': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'Does Not Have Count',
    },
    '1002': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'Does Not Have Version',
    },
    '1003': {
      code: '351',
      description: 'General Get Failure',
      diagnostic: 'Set Out Of Order',
    },
    '1004': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'Out Of Range',
    },
    '1005': {
      code: '351',
      description: 'General Get Failure',
      diagnostic: 'Element Not Specified',
    },
    '1006': {
      code: '351',
      description: 'General Set Failure',
      diagnostic: 'Not Unique',
    },
    '1007': {
      code: '351',
      description: 'General Set Failure',
      diagnostic: 'Max Exceeded',
    },
    '1008': {
      code: '301',
      description: 'General Get Failure',
      diagnostic: 'Invalid Argument',
    },
    '1009': {
      code: '351',
      description: 'General Set Failure',
      diagnostic: 'Overwrite ID',
    },
    '2000': {
      code: '404',
      description: 'Data Model Element Is Read Only',
      diagnostic: 'Set Keyword',
    },
    '9000': {
      code: '401',
      description: 'Undefined Data Model Element',
      diagnostic: 'Invalid Request',
    },
  };

  setCurrentErrorCode(code: string) {
    this.currentErrorCode = code;
  }

  getCurrentErrorCode() {
    return this.errors[this.currentErrorCode] ? this.errors[this.currentErrorCode].code : '0';
  }

  getErrorDescription(code: string) {
    code = code || this.currentErrorCode;
    return this.errors[code] ? this.errors[code].description : '';
  }
  getErrorDiagnostic(code: string) {
    code = code || this.currentErrorCode;
    return this.errors[code] ? this.errors[code].diagnostic : '';
  }

  clearCurrentErrorCode() {
    this.currentErrorCode = '0';
  }
}
