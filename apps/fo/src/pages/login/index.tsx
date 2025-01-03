import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldType, Form, DynamicFormField } from '@learnway/ui';
import { Button } from '@learnway/ui';

import { useLoginUser, useFetchAuthUser } from '../../entities/user';
import { useFetchCompanySelectOptions } from '../../entities/company';

import { useSetLanguage } from '../../features/system';

export const Route = createFileRoute('/login/')({
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
  const { set: setLanguage, inProgress } = useSetLanguage();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      orgId: '1',
      accountId: 'user1',
      password: 'hae1234',
    },
  });

  useEffect(() => {
    if (data?.accountId && !inProgress) {
      router.navigate({ to: '/' });
    }
  }, [data, inProgress]);

  const handleSubmit = () => {
    login(form.getValues(), {
      onSuccess: async (data, variables, context) => {
        const userLang = data.data.data.userLanguageSetCode;
        await setLanguage(userLang);
        router.navigate({ to: '/' });
      },
    });
  };

  return (
    <div className="min-h-screen  justify-center items-center flex flex-col">
              <div className="typo-title-[3-B]">학습자 로그인</div>
      <div className="bg-slate-200 p-10 rounded-lg">
        <Form {...form} schema={schema}>
          <div className="w-64">
            <DynamicFormField
              name="orgId"
              label={t('ORG')}
              type={FieldType.SELECT}
              options={companyOptions ?? []}
            />
            <DynamicFormField name="accountId" label={t('USER_ID')} type={FieldType.TEXT} />
            <DynamicFormField name="password" label={t('PASSWORD')} type={FieldType.PASSWORD} />
          </div>
          <Button className="mt-10" type="submit" onClick={() => handleSubmit()}>
            {t('LOGIN')}
          </Button>
        </Form>
      </div>
    </div>
  );
}
