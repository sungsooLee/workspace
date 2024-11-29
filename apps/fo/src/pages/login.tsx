import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { FieldType } from '@learnway/ui';
import { CommonFormItem } from '@learnway/ui';
import { FormExtend } from '@learnway/ui';
import { Button } from '@learnway/ui';

import { useLoginUser, useFetchAuthUser } from '../entities/user';
import { useFetchCompanySelectOptions } from '../entities/company';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const schema = z.object({
    orgId: z.string(),
    accountId: z.string(),
    password: z.string(),
  });

  const { data } = useFetchAuthUser();
  const { data: companyOptions } = useFetchCompanySelectOptions();

  const { login } = useLoginUser();

  useEffect(() => {
    if (data?.accountId) {
      router.navigate({ to: '/' });
    }
  }, [data]);

  const handleSubmit = (data: any) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-slate-200 p-10 rounded-lg">
        <FormExtend
          schema={schema}
          onSubmit={handleSubmit}
          defaultValues={{
            orgId: '1',
            accountId: 'user1',
            password: 'hae1234',
          }}>
          <div className="w-64">
            <CommonFormItem
              name="orgId"
              label={t('ORG')}
              type={FieldType.SELECT}
              options={companyOptions ?? []}
            />
            <CommonFormItem name="accountId" label={t('USER_ID')} type={FieldType.TEXT} />
            <CommonFormItem name="password" label={t('PASSWORD')} type={FieldType.TEXT} />
          </div>

          <Button className="mt-10" type="submit">
            로그인
          </Button>
        </FormExtend>
      </div>
    </div>
  );
}
