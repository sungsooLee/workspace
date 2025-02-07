import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldType, Form, DynamicFormField } from '@learnway/ui';
import { Button, Select } from '@learnway/ui';

import { useLoginUser, useFetchAuthUser } from '../../entities/user';

import { useSetLanguage, useLanguageSelectOptions } from '../../features/platform';

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

  const { login } = useLoginUser();
  const { set: setLanguage, inProgress } = useSetLanguage();
  const { data: languageSelectOptions } = useLanguageSelectOptions();

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
      //router.navigate({ to: '/' });
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="typo-title-[3-B]">관리자 로그인</div>
      <div className="typo-title-[3-B]">
        <Select options={languageSelectOptions}></Select>
      </div>
      <div className="rounded-lg bg-slate-200 p-10">
        <Form {...form} schema={schema}>
          <div className="w-64">
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
