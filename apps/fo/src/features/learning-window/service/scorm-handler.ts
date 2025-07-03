import { ScormRteClient } from './scorm-rte-client';
import { ScormDataManager } from './scorm-data-manager';

/**
 * ASIS: AjaxDMHandlerAPI
 * 를 ScormAdapter 로 변경
 *
 */
export class ScormHandler {
  srte = new ScormRteClient();
  dm = new ScormDataManager(this.srte.getErrorManager());

  // SCORM API
  Initialize(param: string) {
    this.srte.log('Called Initialize');
    let result = 'false';

    if (this.srte.getTerminatedState()) {
      this.srte.getErrorManager().setCurrentErrorCode('104');
      this.srte.log('Initialize Returned Error Code 104');
      return result;
    }

    this.srte.setTerminatedState(false);
    this.srte.setTerminateCalled(false);

    if (param !== '') this.srte.getErrorManager().setCurrentErrorCode('201');
    else if (this.srte.isInitialized()) this.srte.getErrorManager().setCurrentErrorCode('103');
    else {
      this.srte.setWasLmsSuspendAllPushed(false);
      this.srte.setWasQuitButtonPushed(false);
      this.srte.setWasPreviousButtonPushed(false);
      this.srte.setWasNextButtonPushed(false);
      this.srte.setWasTOCPushed(false);
      this.srte.setUserNavRequest('_none_');

      // build request (ClientRTS:450)
      const reqdata: any = {
        mActivityID: this.srte.getActivityID(),
        mStateID: this.srte.getStateID(),
        mStudentID: this.srte.getUserID(),
        mUserName: this.srte.getUserName(),
        mCourseID: this.srte.getCourseID(),
        mRequestType: 1,
        mNumAttempt: this.srte.getNumAttempts(),
      };
      // post to lms : this.srte.getServletURL()
      const resp = this.srte.send(reqdata);
      // get datamodel back : reponse.mActivityData
      // set valid requests : mValidRequests
      this.dm.fromJSON(resp);
      this.srte.setInitializedState(true);
      this.srte.getErrorManager().clearCurrentErrorCode();
      result = 'true';
    }
    this.srte.log(
      'Initialize Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
    );

    return result;
  }

  Commit(param: string) {
    let result = 'false';

    if (this.srte.getTerminatedState()) {
      this.srte.getErrorManager().setCurrentErrorCode('143');
      this.srte.log(
        'Commit Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }

    //top.frames['LMSFrame'].setUIState(false);

    if (this.srte.getTerminatedState()) {
      this.srte.getErrorManager().setCurrentErrorCode('143');
      this.srte.log(
        'Commit Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }
    if (!this.srte.isInitialized()) {
      this.srte.getErrorManager().setCurrentErrorCode('142');
      this.srte.log(
        'Commit Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }
    if (param !== '') {
      this.srte.getErrorManager().setCurrentErrorCode('201');
      this.srte.log(
        'Commit Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }

    // request type = type_set (4)
    const reqdata = {
      mActivityData: this.dm.calllist(),
      mIsFinished: this.srte.getTerminateCalled(),
      mRequestType: 4,
      mCourseID: this.srte.getCourseID(),
      mStudentID: this.srte.getUserID(),
      mUserName: this.srte.getUserName(),
      mStateID: this.srte.getStateID(),
      mActivityID: this.srte.getActivityID(),
      mNumAttempt: this.srte.getNumAttempts(),
      mQuitPushed: this.srte.getWasQuitButtonPushed(),
      mSuspendPushed: this.srte.getWasLmsSuspendAllPushed(),
    };
    this.dm.clearcalllist();
    // ClientRTS:1293
    const resp: any = this.srte.send(reqdata);

    if (resp.mError !== 'OK') {
      this.srte.getErrorManager().setCurrentErrorCode('101');
    } else {
      this.srte.getErrorManager().clearCurrentErrorCode();
      result = 'true';
      this.dm.fromJSON(resp);
    }

    //top.frames['LMSFrame'].setUIState(true);
    //top.frames['LMSFrame'].refreshMenu();

    this.srte.log(
      'Commit Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
    );

    return result;
  }

  Terminate(param: string) {
    let result = 'false';
    this.srte.setTerminateCalled(true);
    this.srte.log('Called Terminate ');

    if (this.srte.getTerminatedState()) {
      this.srte.getErrorManager().setCurrentErrorCode('113');
      this.srte.log(
        'Terminate Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }
    if (!this.srte.isInitialized()) {
      this.srte.getErrorManager().setCurrentErrorCode('112');
      this.srte.log(
        'Terminate Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }
    if (param !== '') {
      this.srte.getErrorManager().setCurrentErrorCode('201');
      this.srte.log(
        'Terminate Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }

    // ClientRTS:600
    if (
      this.srte.getWasLmsSuspendAllPushed() ||
      this.srte.getWasQuitButtonPushed() ||
      this.srte.getWasPreviousButtonPushed() ||
      this.srte.getWasNextButtonPushed() ||
      this.srte.getWasTOCPushed()
    ) {
      // set adl.nav.request to this.srte.getUserNavRequest()
      this.dm.setValue('adl.nav.request', this.srte.getUserNavRequest());
    }

    const event = this.dm.getValue('adl.nav.request');

    // check if suspended, if so make sure cmi.exit is "suspend"
    if (event === 'suspendAll' || this.srte.getWasLmsSuspendAllPushed()) {
      const curexitval = this.dm.getValue('cmi.exit');
      if (curexitval && curexitval !== 'logout') {
        this.dm.setValue('cmi.exit', 'suspend');
      }
    }

    // don't commit data on abandon: clientrts:624
    if (event !== 'abandon' && event !== 'abandonAll') {
      result = this.Commit('');
    } else {
      result = 'true';
    }

    this.srte.setTerminatedState(true);

    // ClientRTS:636
    if (result !== 'true') {
      this.srte.getErrorManager().setCurrentErrorCode('391');
      this.srte.log('Commit failed causing Terminate to fail.');
      return result;
    }
    // else on ClientRTS:645
    this.srte.setInitializedState(false);
    // get value of exit...
    const exitvalue = this.dm.getValue('cmi.exit') || '';
    let tempevent = '_none_';
    // let isChoice = false;
    // let isJump = false;

    // figure out event
    tempevent = exitvalue === 'time-out' || exitvalue === 'logout' ? 'exitAll' : exitvalue;
    // if (event.indexOf('}jump') > -1) {
    //   try {
    //     tempevent = /{target=(.*)}jump/.exec(foo)[1];
    //   } catch (e) {
    //     tempevent = '_none_';
    //   }
    //   isJump = true;
    // } else if (event.indexOf('}choice')) {
    //   try {
    //     tempevent = /{target=(.*)}choice/.exec(foo)[1];
    //   } catch (e) {
    //     tempevent = '_none_';
    //   }
    //   isChoice = true;
    // }

    // now handle the event ClientRTS:734
    if (
      !(
        this.srte.getWasLmsSuspendAllPushed() ||
        this.srte.getWasPreviousButtonPushed() ||
        this.srte.getWasNextButtonPushed() ||
        this.srte.getWasTOCPushed()
      ) &&
      tempevent !== '_none_'
    ) {
      // if (isChoice) top.frames['LMSFrame'].doChoiceEvent(tempevent);
      // else if (isJump) top.frames['LMSFrame'].doJumpEvent(tempevent);
      // else top.frames['LMSFrame'].doNavEvent(tempevent);
    }

    this.srte.log(
      'Terminate Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
    );
    return result;
  }

  SetValue(dmelement: string, value: string) {
    this.srte.log(`Called SetValue(${dmelement}, ${value}) `);
    let val = 'false';

    if (this.srte.getTerminatedState()) {
      const result = this.srte.getErrorManager().setCurrentErrorCode('133');
      this.srte.log(
        'SetValue Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }
    if (!this.srte.isInitialized()) {
      const result = this.srte.getErrorManager().setCurrentErrorCode('132');
      this.srte.log(
        'SetValue Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return result;
    }

    this.dm.setValue(dmelement, value);
    val = 'true';

    this.srte.log('SetValue Returned ' + val);
    return val;
  }

  GetValue(element: string) {
    this.srte.log(`Called GetValue(${element}) `);
    let val = '';
    if (this.srte.getTerminatedState()) {
      this.srte.getErrorManager().setCurrentErrorCode('123');
      this.srte.log(
        'GetValue Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return val;
    }
    if (!this.srte.isInitialized()) {
      this.srte.getErrorManager().setCurrentErrorCode('122');
      this.srte.log(
        'GetValue Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
      );
      return val;
    }

    this.srte.getErrorManager().clearCurrentErrorCode();

    // is a status?.. look for threshold and measure
    if (element === 'cmi.completion_status') {
      const compthresh = this.dm.getValue('cmi.completion_threshold');
      if (this.srte.getErrorManager().getCurrentErrorCode() == 0) {
        const progmeas = this.dm.getValue('cmi.progress_measure');
        if (this.srte.getErrorManager().getCurrentErrorCode() == 0) {
          val = progmeas >= compthresh ? 'completed' : 'incomplete';
        } else {
          val = 'unknown';
        }
        this.srte.getErrorManager().clearCurrentErrorCode();
      }
    } else if (element === 'cmi.success_status') {
      const sps = this.dm.getValue('cmi.scaled_passing_score');
      if (this.srte.getErrorManager().getCurrentErrorCode() == 0) {
        const ss = this.dm.getValue('cmi.score.scaled');
        if (this.srte.getErrorManager().getCurrentErrorCode() == 0) {
          val = ss >= sps ? 'passed' : 'failed';
        } else {
          val = 'unknown';
        }
        this.srte.getErrorManager().clearCurrentErrorCode();
      }
    } else {
      val = this.dm.getValue(element);
    }

    this.srte.log(
      'GetValue Returned Error Code ' + this.srte.getErrorManager().getCurrentErrorCode(),
    );
    return val;
  }

  GetLastError() {
    this.srte.log('Called GetLastError() ');
    const val = this.srte.getErrorManager().getCurrentErrorCode();
    this.srte.log('GetLastError Returned ' + val);
    return val;
  }

  GetErrorString(errcode: string) {
    this.srte.log(`Called GetErrorString(${errcode}) `);
    const val = this.srte.getErrorManager().getErrorDescription(errcode);
    this.srte.log('GetErrorString Returned ' + val);
    return val;
  }

  GetDiagnostic(errcode: string) {
    this.srte.log(`Called GetDiagnostic(${errcode}) `);
    const val = this.srte.getErrorManager().getErrorDiagnostic(errcode);
    this.srte.log('GetDiagnostic Returned ' + val);
    return val;
  }
}
