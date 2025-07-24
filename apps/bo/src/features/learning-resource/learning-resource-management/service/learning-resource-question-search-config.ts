import { CODE_GROUP, SearchBoxConfig } from '@learnway/hooks';
import { t } from 'i18next';

export const questionSearchConfig: () => SearchBoxConfig = () => ({
  builders: [
    [
      {
        required: true,
        name: 'tenantId',
        type: 'dropdown',
        format: 'number',
        label: t('테넌트'),
        value: undefined,
        optionsConfig: {
          codeGroup: CODE_GROUP['manual.tenant.tenantId'],
        },
      },
    ],
    [],
  ],
  validator: {},
});
