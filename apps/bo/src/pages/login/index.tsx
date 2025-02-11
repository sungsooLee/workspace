import { useEffect } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { zodValidator } from '@learnway/config';
import { Button, Checkbox, DynamicFormField, FieldType, Select, SelectOption } from '@learnway/ui';

import { useFetchAuthUser, useLoginUser } from '../../entities/user';

import { useLanguageSelectOptions, useSetLanguage } from '../../features/platform';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const schema = z.object({
    orgId: z.string(),
    //accountId: z.string().required(),
    accountId: zodValidator.stringRequied.min(3),
    //accountNum: z.union([z.number(), z.undefined()]).transform(required),
    accountNum: zodValidator.numberRequied.gte(5),
    //number: z.coerce.number().transform(required), //coerce
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
      accountId: '',
      password: 'hae1234',
    },
  });

  useEffect(() => {
    if (data?.accountId && !inProgress) {
      //router.navigate({ to: '/' });
    }
  }, [data, inProgress]);

  const handleProgress = () => {
    console.log('handleProgress');
  };

  const handleSearchAccount = () => {
    console.log('handleSearchAccount');
  };

  const handleSearchPassword = () => {
    console.log('handleSearchPassword');
  };

  const handleSignUp = () => {
    console.log('SignUp');
  };

  const handleLanguage = (lang?: SelectOption) => {
    console.log('handleLanguage', lang);
  };

  const handleSubmit = (data: z.infer<typeof schema>) => {
    alert(JSON.stringify(data, null, 2));
    /*
    login(form.getValues(), {
      onSuccess: async (data, variables, context) => {
        const userLang = data.data.data.userLanguageSetCode;
        await setLanguage(userLang);
        router.navigate({ to: '/' });
      },
    });*/
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="typo-title-[3-B]">관리자 로그인</div>
      <div className="typo-title-[3-B]">
        <Select options={languageSelectOptions} onChange={(lang) => handleLanguage(lang)}></Select>
      </div>
      <div className="rounded-lg bg-slate-200 p-10">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="w-64">
              <DynamicFormField name="accountId" label={t('USER_ID')} type={FieldType.TEXT} />
              <DynamicFormField
                name="accountNum"
                label={t('USER_NUMBER')}
                type={FieldType.NUMBER}
              />
              <DynamicFormField name="password" label={t('PASSWORD')} type={FieldType.PASSWORD} />
              <Checkbox /> {t('아이디 저장')}
              <Button onClick={() => handleProgress()}>{t('진행현황 확인')}</Button>
              <Button onClick={() => handleSearchAccount()}>{t('아이디 찾기')}</Button>
              <Button onClick={() => handleSearchPassword()}>{t('비밀번호 찾기')}</Button>
            </div>
            <Button type="submit">{t('LOGIN')}</Button>

            <Button onClick={() => handleSignUp()}>{t('관리자 회원가입')}</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
