/*
 * 기존 소스  Scorm2004Handler.js
 */

const SCORM2004_ERROR_CODES = {
  '0': 'No Error',
  '101': 'General Exception',
  '102': 'General Initialization Failure',
  '103': 'Already Initialized',
  '104': 'Content Instance Terminated',
  '111': 'General Termination Failure',
  '112': 'Termination Before Initialization',
  '113': 'Termination After Termination',
  '122': 'Retrieve Data Before Initialization',
  '123': 'Retrieve Data After Termination',
  '132': 'Store Data Before Initialization',
  '133': 'Store Data After Termination',
  '142': 'Commit Before Initialization',
  '143': 'Commit After Termination',
  '201': 'General Argument Error',
  '301': 'General Get Failure',
  '351': 'General Set Failure',
  '391': 'General Commit Failure',
  '401': 'Undefined Data Model Element',
  '402': 'Unimplemented Data Model Element',
  '403': 'Data Model Element Value Not Initialized',
  '404': 'Data Model Element Is Read Only',
  '405': 'Data Model Element Is Write Only',
  '406': 'Data Model Element Type Mismatch',
  '407': 'Data Model Element Value Out Of Range',
  '408': 'Data Model Dependency Not Established',
};

const SCORM2004_DIAGNOSTIC = {
  '0': 'No error occurred, the previous API call was successful',
  '101':
    'No specific error code exists to describe the error. Use GetDiagnostic for more information.',
  '102': 'Call to Initialize failed for an unknown reason.',
  '103': 'Call to Initialize failed because Initialize was already called.',
  '104': 'Call to Initialize failed because Terminate was already called.',
  '111': 'Call to Terminate failed for an unknown reason.',
  '112': 'Call to Terminate failed because it was made before the call to Initialize.',
  '113': 'Call to Terminate failed because Terminate was already called.',
  '122': 'Call to GetValue failed because it was made before the call to Initialize.',
  '123': 'Call to GetValue failed because it was made after the call to Terminate.',
  '132': 'Call to SetValue failed because it was made before the call to Initialize.',
  '133': 'Call to SetValue failed because it was made after the call to Terminate.',
  '142': 'Call to Commit failed because it was made before the call to Initialize.',
  '143': 'Call to Commit failed because it was made after the call to Terminate.',
  '201':
    'An invalid argument was passed to an API method (usually indicates that Initialize, Commit or Terminate did not receive the expected empty string argument.',
  '301':
    'Indicates a failed GetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.',
  '351':
    'Indicates a failed SetValue call where no other specific error code is applicable. Use GetDiagnostic for more information.',
  '391':
    'Indicates a failed Commit call where no other specific error code is applicable. Use GetDiagnostic for more information.',
  '401':
    'The data model element name passed to GetValue or SetValue is not a valid SCORM data model element.',
  '402':
    'The data model element indicated in a call to GetValue or SetValue is valid, but was not implemented by this LMS. In SCORM 2004, this error would indicate an LMS that is not fully SCORM conformant.',
  '403':
    'Attempt to read a data model element that has not been initialized by the LMS or through a SetValue call. This error condition is often reached during normal execution of a SCO.',
  '404': 'SetValue was called with a data model element that can only be read.',
  '405': 'GetValue was called on a data model element that can only be written to.',
  '406':
    'SetValue was called with a value that is not consistent with the data format of the supplied data model element.',
  '407':
    'The numeric value supplied to a SetValue call is outside of the numeric range allowed for the supplied data model element.',
  '408':
    'Some data model elements cannot be set until another data model element was set. This error condition indicates that the prerequisite element was not set before the dependent element.',
};

function debug(str: string, ...optionParams: any[]) {
  console.log(str, ...optionParams);
  //console.trace();
  //if(isDebug){
  //    $("#debugArea").append(str+"</br>");
  //    var dwin=document.getElementById("debugArea");
  //    dwin.scrollTop=dwin.scrollHeight;
  //}
}

/**
 * ASIS: AjaxDMHandlerAPI
 * 를 ScormAdapter 로 변경
 *
 */

export class ScormAdapter {
  isInitialized = false;
  isTerminated = false;
  lastErrorCode = '0';

  oncommit = null;
  context = '';
  version = '1.0';

  p_cors_in = null;
  p_lctr_in = null;
  p_lcrg_in = null;
  p_scom_in = null;
  p_scit_in = null;
  p_scst_in = null;
  p_user_sn = null;
  p_user_nm = null;
  p_scsl_in = null;
  p_scit_id = null;
  p_scil_in = null;
  p_lcus_in = null;
  p_cotn_in = null;
  p_cotn_toc_in = null;
  p_lctr_year = null;
  save_yn = 'Y';
  dvc_type_cd = null;

  p_org_in = null;
  p_edu_strt_dt = null;
  p_edu_end_dt = null;
  p_lctr_num = null;
  p_lib_yn = null;

  InitializeAPIEM() {
    debug('Call InitializeAPIEM');
    //alert("InitializeAPIEM");
    this.isInitialized = false;
    this.isTerminated = false;
    this.lastErrorCode = '0';

    // $.ajax({
    //   async: false,
    //   type: 'POST',
    //   url: this.context + '/study/scorm2004/selectInitializeAPIEM.do',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   data: JSON.stringify({
    //     user_sn: this.p_user_sn,
    //     scst_in: this.p_scst_in,
    //     scom_in: this.p_scom_in,
    //   }),
    // }).done(function (msg) {});
  }

  Initialize(p: string) {
    debug('Call Initialize', p);
    if (p != null && p != '') {
      this.SetLastError('201');
      return 'false';
    }
    if (this.isInitialized) {
      this.SetLastError('103');
      return 'false';
    }
    if (this.isTerminated) {
      this.SetLastError('104');
      return 'false';
    }

    //alert("Initialize \n error : "+ this.GetLastError() );

    var ret = '';
    var lastErrorCode = '0';
    var tempScilIn = null;

    // $.ajax({
    //   async: false,
    //   type: 'POST',
    //   url: this.context + '/study/scorm2004/selectInitialize.do',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   data: JSON.stringify({
    //     cors_in: this.p_cors_in,
    //     lctr_in: this.p_lctr_in,
    //     lcrg_in: this.p_lcrg_in,
    //     user_sn: this.p_user_sn,
    //     user_nm: this.p_user_nm,
    //     scit_in: this.p_scit_in,
    //     scst_in: this.p_scst_in,
    //     scsl_in: this.p_scsl_in,
    //     scit_id: this.p_scit_id,
    //     scom_in: this.p_scom_in,
    //     lcus_in: this.p_lcus_in,
    //     cotn_in: this.p_cotn_in,
    //     cotn_toc_in: this.p_cotn_toc_in,
    //     lctr_year: this.p_lctr_year,
    //     lctr_num: this.p_lctr_num,
    //     save_yn: this.save_yn,
    //     dvc_type_cd: this.dvc_type_cd,
    //     org_in: this.p_org_in,
    //     edu_strt_dt: this.p_edu_strt_dt,
    //     edu_end_dt: this.p_edu_end_dt,
    //     lib_yn: this.p_lib_yn,
    //   }),
    //   error: function () {
    //     alert('Initialize Error');
    //   },
    // }).done(function (res) {
    //   if (res.error != null) {
    //     lastErrorCode = res.error;
    //   }
    //   tempScilIn = res.scil_in;
    //   debug('Initialize : ' + ret);
    // });

    this.p_scil_in = tempScilIn;
    this.isInitialized = true;
    this.isTerminated = false;
    this.lastErrorCode = '0';

    return 'true';
  }

  GetValue(p_key: string) {
    debug('GetValue', p_key);
    let ret = new String('');
    try {
      if (!this.isInitialized) {
        this.SetLastError('122');
        ret = new String('');
        return ret;
      }
      if (this.isTerminated) {
        this.SetLastError('123');
        ret = new String('');
        return ret;
      }
      if (p_key == null || p_key == '') {
        this.SetLastError('301');
        ret = new String('');
        return ret;
      }

      //alert("GetValue: " + p_key + "\n error : "+ this.GetLastError() );

      let lastErrorCode = '0';

      // $.ajax({
      //   async: false,
      //   type: 'POST',
      //   url: this.context + '/study/scorm2004/selectGetValue.do',
      //   contentType: 'application/json',
      //   dataType: 'json',
      //   data: JSON.stringify({
      //     cors_in: this.p_cors_in,
      //     lctr_in: this.p_lctr_in,
      //     lcrg_in: this.p_lcrg_in,
      //     user_sn: this.p_user_sn,
      //     scit_in: this.p_scit_in,
      //     scst_in: this.p_scst_in,
      //     key: p_key,
      //     scsl_in: this.p_scsl_in,
      //     scit_id: this.p_scit_id,
      //     scom_in: this.p_scom_in,
      //     scil_in: this.p_scil_in,
      //     lcus_in: this.p_lcus_in,
      //     cotn_in: this.p_cotn_in,
      //     cotn_toc_in: this.p_cotn_toc_in,
      //     lctr_year: this.p_lctr_year,
      //     lctr_num: this.p_lctr_num,
      //     save_yn: this.save_yn,
      //     dvc_type_cd: this.dvc_type_cd,
      //     org_in: this.p_org_in,
      //     edu_strt_dt: this.p_edu_strt_dt,
      //     edu_end_dt: this.p_edu_end_dt,
      //     lib_yn: this.p_lib_yn,
      //   }),
      //   error: function () {
      //     debug('Error : GetValue = ' + p_key);
      //   },
      // }).done(function (res) {
      //   if (res.error != null) {
      //     lastErrorCode = res.error;
      //   }
      //   ret = res.value;

      //   if (ret == null) ret = new String('');
      //   debug('getValue : ' + p_key + '=' + ret);
      // });

      this.SetLastError(lastErrorCode);

      return ret;
    } catch (e: any) {
      debug(e.message);
      ret = new String('');
      return ret;
    }
  }

  SetValue(p_key: string, p_value: string) {
    debug('SetValue', p_key, p_value);
    if (!this.isInitialized) {
      this.SetLastError('132');
      return 'false';
    }
    if (this.isTerminated) {
      this.SetLastError('133');
      return 'false';
    }
    if (p_key == null || p_key == '') {
      this.SetLastError('351');
      return 'false';
    }
    //alert("SetValue: " + p_key + " : " + p_value + "\n error : "+ this.GetLastError() );

    let lastErrorCode = '0';

    // $.ajax({
    //   async: false,
    //   type: 'POST',
    //   url: this.context + '/study/scorm2004/selectSetValue.do',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   data: JSON.stringify({
    //     cors_in: this.p_cors_in,
    //     lctr_in: this.p_lctr_in,
    //     lcrg_in: this.p_lcrg_in,
    //     user_sn: this.p_user_sn,
    //     scit_in: this.p_scit_in,
    //     scst_in: this.p_scst_in,
    //     key: p_key,
    //     value: p_value,
    //     scsl_in: this.p_scsl_in,
    //     scit_id: this.p_scit_id,
    //     scom_in: this.p_scom_in,
    //     scil_in: this.p_scil_in,
    //     lcus_in: this.p_lcus_in,
    //     cotn_in: this.p_cotn_in,
    //     cotn_toc_in: this.p_cotn_toc_in,
    //     lctr_year: this.p_lctr_year,
    //     lctr_num: this.p_lctr_num,
    //     save_yn: this.save_yn,
    //     dvc_type_cd: this.dvc_type_cd,
    //     org_in: this.p_org_in,
    //     edu_strt_dt: this.p_edu_strt_dt,
    //     edu_end_dt: this.p_edu_end_dt,
    //     lib_yn: this.p_lib_yn,
    //   }),
    //   error: function () {
    //     debug('Error : SetValue = ' + p_key + '\t' + p_value);
    //   },
    // }).done(function (res) {
    //   debug('setValue : ' + p_key + '=' + p_value);
    //   if (res.error != null) {
    //     lastErrorCode = res.error;
    //   }
    // });

    this.SetLastError(lastErrorCode);
    if (lastErrorCode != '0') return 'false';
    else return 'true';
  }

  Terminate(p: string) {
    debug('Terminate start: ', p);
    if (p != null && p != '') {
      this.SetLastError('201');
      return 'false';
    }
    if (!this.isInitialized) {
      this.SetLastError('112');
      return 'false';
    }
    if (this.isTerminated) {
      this.SetLastError('113');
      return 'false';
    }

    //alert("Terminate \n error : "+ this.GetLastError() );

    // $.ajax({
    //   async: false,
    //   type: 'POST',
    //   url: this.context + '/study/scorm2004/selectTerminate.do',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   data: JSON.stringify({
    //     cors_in: this.p_cors_in,
    //     lctr_in: this.p_lctr_in,
    //     lcrg_in: this.p_lcrg_in,
    //     user_sn: this.p_user_sn,
    //     scit_in: this.p_scit_in,
    //     scst_in: this.p_scst_in,
    //     scsl_in: this.p_scsl_in,
    //     scit_id: this.p_scit_id,
    //     scom_in: this.p_scom_in,
    //     scil_in: this.p_scil_in,
    //     lcus_in: this.p_lcus_in,
    //     cotn_in: this.p_cotn_in,
    //     cotn_toc_in: this.p_cotn_toc_in,
    //     lctr_year: this.p_lctr_year,
    //     lctr_num: this.p_lctr_num,
    //     save_yn: this.save_yn,
    //     dvc_type_cd: this.dvc_type_cd,
    //     org_in: this.p_org_in,
    //     edu_strt_dt: this.p_edu_strt_dt,
    //     edu_end_dt: this.p_edu_end_dt,
    //     lib_yn: this.p_lib_yn,
    //   }),
    //   error: function () {
    //     debug('Error in terminate');
    //   },
    // }).done(function (res) {
    //   debug('Terminate end' + p);
    //   if (res.error != null) {
    //     this.SetLastError(res.error);
    //   }
    //   var nav = res.nav;
    //   debug('nav : ' + nav);
    //   var jump = res.jump;
    //   if (res.nav != '_none_') study(nav, jump);
    // });

    this.isInitialized = true;
    this.isTerminated = true;
    this.lastErrorCode = '0';
    return 'true';
  }

  Commit(p: string) {
    debug('Commit', p);
    if (p != null && p != '') {
      this.SetLastError('201');
      return 'false';
    }
    if (!this.isInitialized) {
      this.SetLastError('142');
      return 'false';
    }
    if (this.isTerminated) {
      this.SetLastError('143');
      return 'false';
    }

    //alert("Commit \n error : "+ this.GetLastError() );

    // $.ajax({
    //   async: false,
    //   type: 'POST',
    //   url: this.context + '/study/scorm2004/selectCommit.do',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   data: JSON.stringify({
    //     cors_in: this.p_cors_in,
    //     lctr_in: this.p_lctr_in,
    //     lcrg_in: this.p_lcrg_in,
    //     user_sn: this.p_user_sn,
    //     scit_in: this.p_scit_in,
    //     scst_in: this.p_scst_in,
    //     scsl_in: this.p_scsl_in,
    //     scit_id: this.p_scit_id,
    //     scom_in: this.p_scom_in,
    //     scil_in: this.p_scil_in,
    //     lcus_in: this.p_lcus_in,
    //     cotn_in: this.p_cotn_in,
    //     cotn_toc_in: this.p_cotn_toc_in,
    //     lctr_year: this.p_lctr_year,
    //     lctr_num: this.p_lctr_num,
    //     save_yn: this.save_yn,
    //     dvc_type_cd: this.dvc_type_cd,
    //     org_in: this.p_org_in,
    //     edu_strt_dt: this.p_edu_strt_dt,
    //     edu_end_dt: this.p_edu_end_dt,
    //     lib_yn: this.p_lib_yn,
    //   }),
    // }).done(function (msg) {
    //   if (_this.oncommit != null) {
    //     _this.oncommit();
    //   }
    //   debug('Commit : ' + p);
    // });

    this.lastErrorCode = '0';

    return 'true';
  }

  GetLastError(p: string) {
    debug('GetLastError', p);
    if (this.lastErrorCode != null) return this.lastErrorCode;
    else return '0';
  }

  SetLastError(p: number | string) {
    debug('SetLastError', p);
    if (p !== 0 && p !== '0') debug('Error : ' + p);
    this.lastErrorCode = '' + p;
    return '';
  }

  GetDiagnostic(p: keyof typeof SCORM2004_DIAGNOSTIC) {
    debug('GetDiagnostic', p);
    const errStr = SCORM2004_DIAGNOSTIC[p];
    if (errStr != null) return errStr;
    return '';
  }

  GetErrorString(p: keyof typeof SCORM2004_ERROR_CODES) {
    debug('GetErrorString', p);
    const errStr = SCORM2004_ERROR_CODES[p];
    if (errStr != null) return errStr;
    return '';
  }
}
