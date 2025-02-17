import { createFileRoute } from '@tanstack/react-router'
import { IcoBuilding01 } from '@learnway/icons'
import { IcoOverseasDealer } from '@learnway/icons'
import authStyles from './auth.module.css'
import signupStyles from './signup.module.css'
import styles from './signup.module.css'
import { Button, Radio } from '@learnway/ui'

export const Route = createFileRoute('/_auth/signup_step1')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={signupStyles.signup_info}>
          <div className={signupStyles.signup_step}>step</div>
          <div className={signupStyles.signup_select}>
            <IcoBuilding01 width={48} height={48} stroke="#131C30" />
            <IcoOverseasDealer width={48} height={48} />
          </div>
          <div className={authStyles.btn_wrap}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
