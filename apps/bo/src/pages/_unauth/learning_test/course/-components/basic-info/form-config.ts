// const formConfig: DynamicFormConfig = {
export const formConfig: DynamicFormConfig = {
  builders: [
    {
      name: 'companyType',
      type: 'radio-group',
      label: t('화사구분'),
      format: 'string',
      value: [],
      options: [
        {
          value: 'isWebExposed',
          label: 'PC',
        },
        {
          value: 'isMobileExposed',
          label: '모바일',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      label: t('화사/법인명'),
      value: '',
    },
  ],
};
