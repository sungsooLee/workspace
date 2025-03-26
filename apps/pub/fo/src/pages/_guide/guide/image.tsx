import { createFileRoute } from '@tanstack/react-router';
import snsGoogleImage from '@learnway/styles/fo/assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_guide/guide/image')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Images Component Guide</h2>
      <p className="loc react">/src/assets/images</p>
      <p className="info">
        이미지에 맞는 폴더에 업로드한다.
        <br />
        단색은 SVG로 저장하고, 단색이 아닌 여러색상의 이미지는 png(x2)로 저장한다.
      </p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import snsGoogleImage from '../../assets/images/common/logo_sns_google.png'; // 필요한 이미지 import
  
// 적용방법(예시)
<img src={snsGoogleImage} alt="google" />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">image</h3>
        <div className="flex_box">
          <div className="desc col">
            <img src={snsGoogleImage} alt="google" />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<img src={snsGoogleImage} alt="google" />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
