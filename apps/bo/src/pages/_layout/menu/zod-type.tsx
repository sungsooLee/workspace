import { createFileRoute } from '@tanstack/react-router';
import { z } from '@learnway/shared';
export const Route = createFileRoute('/_layout/menu/zod-type')({
  component: RouteComponent,
});

function RouteComponent() {
  // 원래는 z.string()은 기본 required이지만,
  // optional()으로 감싼 후 required()를 호출하면 내부 타입로 unwrap되어 에러 메시지 커스터마이징이 가능합니다.
  const nameSchema = z.string().label('이름').required();
  const numberSchema = z.number().label('').optional();
  const arraySchema = z
    .array(
      z.object({
        name: z.string(),
        experience: z.number(),
      }),
    )
    .optional();

  arraySchema.parse([
    {
      name: '1234',
      experience: '1123',
    },
  ]);
  nameSchema.parse(''); // 에러: "이름은 필수입니다."
  numberSchema.parse('');
  return <div>Hello "/_layout/menu/zod-type"!</div>;
}
