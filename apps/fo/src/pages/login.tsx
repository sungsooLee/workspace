import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { FieldType, Form } from '@learnway/ui';
import { Button } from '@learnway/ui';

import { useLoginUser, useFetchAuthUser } from '../entities/user';
import { useFetchCompanySelectOptions } from '../entities/company';
import DynamicFormItem from '@/libs/ui/src/lib/form/form-item';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      orgId: '1',
      accountId: 'user1',
      password: 'hae1234',
    },
  });

  useEffect(() => {
    if (data?.accountId) {
      router.navigate({ to: '/' });
    }
  }, [data]);

  const handleSubmit = () => {
    login(form.getValues());
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-slate-200 p-10 rounded-lg">
        <Form {...form} schema={schema}>
          <div className="w-64">
            <DynamicFormItem
              name="orgId"
              label={t('ORG')}
              type={FieldType.SELECT}
              options={companyOptions ?? []}
            />
            <DynamicFormItem name="accountId" label={t('USER_ID')} type={FieldType.TEXT} />
            <DynamicFormItem name="password" label={t('PASSWORD')} type={FieldType.PASSWORD} />
          </div>

          <Button className="mt-10" type="submit" onClick={() => handleSubmit()}>
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
}
