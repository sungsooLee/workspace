import { createFileRoute } from '@tanstack/react-router';
import { BrowserView, MobileView } from 'react-device-detect';
import { CourseDetail } from '@features/course/course-detail';
import { CourseDetailMobile } from '@features/course/course-detail.mobile';

export const Route = createFileRoute('/_layout/course/detail')({
  component: RouteComponent
})


function RouteComponent() {

  return (
    <>
      <BrowserView>
        <CourseDetail />
      </BrowserView>
      <MobileView>
        {/* <CourseDetailMobile /> */}
      </MobileView>
    </>
  )
}
