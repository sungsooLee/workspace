import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

import { FieldType } from '@learnway/ui';
import { CommonFormItem } from '@learnway/ui';
import { FormExtend } from '@learnway/ui';
import { Button } from '@learnway/ui';

import { useLogin } from '../entities/user';
import { useCompanySelectOptions } from '../entities/company';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

//function convertToSelectOptions() {}

function RouteComponent() {
  const { t } = useTranslation();

  const { data } = useCompanySelectOptions();

  const schema = z.object({
    orgCode: z.string(),
    userId: z.string(),
    password: z.string(),
  });

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-slate-200 h-full">
      <FormExtend
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={{
          orgCode: '',
          userId: '',
          password: '',
        }}>
        <div className="w-64 bg-slate-100">
          <CommonFormItem
            name="orgCode"
            label={t('ORG')}
            type={FieldType.SELECT}
            options={data ?? []}
          />

          <CommonFormItem name="userId" label={t('USER_ID')} type={FieldType.TEXT} />
          <CommonFormItem name="password" label={t('PASSWORD')} type={FieldType.TEXT} />
        </div>

        <Button className="mt-10" type="submit">
          전송
        </Button>
      </FormExtend>
    </div>
  );
}
