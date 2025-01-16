import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guide/guide/color')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
  <h2 className="guide-tit2">Color Guide (FO)</h2>
  <p className="loc sass">SCSS 위치 : /src/assets/styles/_color.scss</p>
  <p className="info">
    /src/assets/styles/_color.scss 컬러값을 수정하면 가이드에 자동
    반영됩니다.
  </p>
  <div className="code-example">
    <pre className="code-block css">
      <code>{exampleCss[0].code}</code>
    </pre>
  </div>
  {updatedColorGroups.map((group, groupIndex) => (
    <div className="color-sec" key={groupIndex}>
      <h3 className="guide-tit3">{group.title}</h3>
      <ul className="info-ul">
        {group.description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      <div className="color-box">
        {group.colors.map((color, index) => (
          <div className="color-info" key={index}>
            <i
              style={{
                backgroundColor: `var(${color.name})`,
                border: color.border || "none",
              }}
            ></i>
            <span className="txt">{color.name}</span>
            <span
              className="code"
              style={{ color: `var(${color.textColor})` }}
            >
              {color.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
