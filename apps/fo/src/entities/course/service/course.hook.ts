import { queryOptions } from "@entities/course";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@types";

// import { queryOptions, treeOption } from "@entities/course";
// export function useGetTree(tenantId: number, deviceType: string = 'pc') {
//   return useQuery(treeOption.getTree(tenantId, deviceType));
// }

export function useCourseDetail(id: number) {
  return useQuery<any>(queryOptions.detail(id));
}

export function useCourseSequences(uuid: string) {
  return useQuery<Course>(queryOptions.courseSequences(uuid));
}
