import React, { useEffect, useRef } from 'react';
import { ScormAdapter } from '../service/scorm-adapter';

const win: any = window;
win.API_1484_11 = new ScormAdapter();

class ScormPlayer extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      learnerId: props.initialLearnerId || '', // 초기 learner_id
      learnerName: props.initialLearnerName || '', // 초기 learner_name
    };
    // console.log(scorm.initialize());
    // console.log('scorm.connectionIsActive : ');
    // console.log(scorm.getConnectionIsActive());
  }

  setScormData(key: string, value: string) {
    // if (scorm.getConnectionIsActive()) {
    //   scorm.dataSet(key, value);
    //   //this.props.sco.set(key, value);
    //   //this.props.sco.commit(); // 변경 사항 저장
    //   console.log(`SCORM Data Updated: ${key} = ${value}`);
    // } else {
    //   console.error('SCORM API is not connected.');
    // }
  }

  render() {
    const {
      iframeSrc,
      iframeHeight = '900',
      iframeWidth = '1300',
      scormDataKey = 'cmi.core.lesson_status',
    } = this.props as any;

    const { learnerId, learnerName } = this.state as any;

    return (
      <div>
        {/* IFrame */}
        <iframe
          //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
          src="/public/8807/resources/01/index.html"
          height={iframeHeight}
          width={iframeWidth}
          title="SCORM Content"
        />
      </div>
    );
  }
}

export default ScormPlayer;
