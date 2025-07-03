import { ScormErrorManager } from './scorm-error-manager';
export class ScormRteClient {
  _logging_on = false;
  _initializedState = false;
  _terminatedState = false;
  _terminateCalled = false;
  _lmsSuspendAllPushed = false;
  _quitButtonPushed = false;
  _previousButtonPushed = false;
  _nextButtonPushed = false;
  _TOCPushed = false;
  _userNavRequest = '_none_';
  // _servletURL = window.location.protocol + "//" + window.location.host + "/adl/lmscmi",
  _activityID = '';
  _stateID = '';
  _userID = '';
  _userName = '';
  _courseID = '';
  _numAttempts = 0;
  _errorManager = new ScormErrorManager();

  // _comm = new srte_xhr(_servletURL);

  isInitialized() {
    return this._initializedState;
  }

  clearState() {
    this._initializedState = false;
    this._terminatedState = false;
    this._terminateCalled = false;
    this._errorManager.clearCurrentErrorCode();
  }

  suspendButtonPushed() {
    if (this.isInitialized()) {
      this._lmsSuspendAllPushed = true;
      this._userNavRequest = 'suspendAll';
      (window as any).API_1484_11.Commit('');
    }
  }

  quitButtonPushed() {
    if (this.isInitialized()) {
      this._quitButtonPushed = true;
      this._userNavRequest = '_none_';
      (window as any).API_1484_11.Commit('');
    }
  }

  previousButtonPushed() {
    if (this.isInitialized()) {
      this._previousButtonPushed = true;
      this._userNavRequest = 'previous';
      // set adl.nav.request to "_none_" ??
    }
  }

  nextButtonPushed() {
    if (this.isInitialized()) {
      this._nextButtonPushed = true;
      this._userNavRequest = 'continue';
      // set adl.nav.request to "_none_" ??
    }
  }

  TOCPushed(scoID: string) {
    if (this.isInitialized()) {
      this._TOCPushed = true;
      this._userNavRequest = '{target=' + scoID + '}choice';
      // set adl.nav.request to "_none_" ??
    }
  }

  resetLoggingVariable() {
    this._logging_on = !this._logging_on;
  }

  log(str: string, ...optionParams: any[]) {
    console.log(str, ...optionParams);
    //console.trace();
    //if(isDebug){
    //    $("#debugArea").append(str+"</br>");
    //    var dwin=document.getElementById("debugArea");
    //    dwin.scrollTop=dwin.scrollHeight;
    //}
    //  if (_logging_on && typeof display_log === "function") {
    //    top.frames['LMSFrame'].display_log(message);
    //  }
  }

  send(data: any) {
    // 전송 처리
    //  return _comm.send((typeof data === "string") ?
    //                 data : JSON.stringify(data));
    return 'true';
  }

  getErrorManager() {
    return this._errorManager;
  }

  getWasLmsSuspendAllPushed() {
    return this._lmsSuspendAllPushed;
  }

  setWasLmsSuspendAllPushed(val: boolean) {
    this._lmsSuspendAllPushed = val;
  }
  getWasQuitButtonPushed() {
    return this._quitButtonPushed;
  }
  setWasQuitButtonPushed(val: boolean) {
    this._quitButtonPushed = val;
  }
  getWasPreviousButtonPushed() {
    return this._previousButtonPushed;
  }
  setWasPreviousButtonPushed(val: boolean) {
    this._previousButtonPushed = val;
  }
  getWasNextButtonPushed() {
    return this._nextButtonPushed;
  }
  setWasNextButtonPushed(val: boolean) {
    this._nextButtonPushed = val;
  }
  getWasTOCPushed() {
    return this._TOCPushed;
  }
  setWasTOCPushed(val: boolean) {
    this._TOCPushed = val;
  }
  setTOCPushed(val: string) {
    this._userNavRequest = val;
    this._TOCPushed = true;
  }
  getUserNavRequest() {
    return this._userNavRequest;
  }
  setUserNavRequest(val: string) {
    this._userNavRequest = val;
  }

  getActivityID() {
    return this._activityID;
  }
  setActivityID(id: string) {
    this._activityID = id;
  }
  getCourseID() {
    return this._courseID;
  }
  setCourseID(id: string) {
    this._courseID = id;
  }
  getStateID() {
    return this._stateID;
  }
  setStateID(id: string) {
    this._stateID = id;
  }
  getUserID() {
    return this._userID;
  }
  setUserID(id: string) {
    this._userID = id;
  }
  getUserName() {
    return this._userName;
  }
  setUserName(name: string) {
    this._userName = name;
  }
  getNumAttempts() {
    return this._numAttempts;
  }
  setNumAttempts(num: number) {
    this._numAttempts = num;
  }
  getTerminatedState() {
    return this._terminatedState;
  }
  setTerminatedState(state: boolean) {
    this._terminatedState = state;
  }
  getTerminateCalled() {
    return this._terminateCalled;
  }
  setTerminateCalled(called: boolean) {
    this._terminateCalled = called;
  }
  getInitializedState = this.isInitialized;
  setInitializedState(init: boolean) {
    this._initializedState = init;
  }
}
