import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldType, Form, DynamicFormField } from '@learnway/ui';
import { Button } from '@learnway/ui';
import { Information } from '@learnway/icons';
import { Info } from '@learnway/icons';
import { Editor, Arrow } from '@learnway/editor';

import { useLoginUser, useFetchAuthUser } from '../../entities/user';
import { useFetchCompanySelectOptions } from '../../entities/company';
import { useSetLanguage } from '../../features/system';

//import { ReactComponent as Information } from '../../assets/information.svg';
//import Information from '../../assets/information.svg?react';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get('redirect') || '/';

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
      router.navigate({ to: redirectUrl });
    }
  }, [data, inProgress]);

  const handleSubmit = () => {
    login(form.getValues(), {
      onSuccess: async (data, variables, context) => {
        const userLang = data.data.data.userLanguageSetCode;
        await setLanguage(userLang);
        // router.navigate({ to: '/' });
        router.navigate({ to: redirectUrl }); // 저장된 URL로 리다이렉트
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="typo-title-[3-B]">학습자 로그인</div>

      <div className="rounded-lg bg-slate-200 p-10">
        <Form {...form} schema={schema}>
          <Information width={120} height={120} stroke="red" />
          <Arrow />
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
