/**
 * Scorm 용 sync API
 */
export class ScormXmlHttpRequest {
  bearerToken: string | undefined;
  constructor(token: string) {
    this.bearerToken = token;
  }

  getXHR() {
    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    }

    throw new Error('not suport IE');
  }

  send(method: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, data?: any, xhr?: any) {
    console.log('send - srte_xhr', data);
    console.trace();
    const x = xhr || this.getXHR();

    x.open(method, url, false);
    xhr.setRequestHeader('Authorization', `Bearer ${this.bearerToken}`);
    x.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    if (data) x.send(data);
    else x.send();

    try {
      return JSON.parse(x.responseText);
      // eslint-disable-next-line no-empty
    } catch (e) {}
    return x.responseText;
  }
}
