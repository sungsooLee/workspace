import { ApplyFormBuilder } from '@learnway/ui';
import { Meta, StoryObj } from '@storybook/react/*';

export default {
  title: 'Components/ApplyFormBuilder',
  component: ApplyFormBuilder,
  tags: ['autodocs'],
  argTYpes: {},
} as Meta;

const BaseFormBuilder = () => {
  // 고정 영역 필드 정의
  const staticFields = [
    {
      name: '신청자 이름',
      slug: 'applicant_name',
      type: 'text',
      isRequired: 'TRUE',
      description: '신청자의 이름을 입력해주세요',
    },
    {
      name: '이메일',
      slug: 'email',
      type: 'text',
      isRequired: 'TRUE',
      description: '연락 가능한 이메일을 입력해주세요',
    },
  ];

  const response = `{
  "status": 200,
  "data": {
    "formId": 1,
    "tenantId": 1,
    "formName": "Dummy신청서",
    "field": [
      {
        "formType": "OPTIONAL",
        "json": [
          {
            "name": "수령인명",
            "slug": "receiver_name",
            "type": "text",
            "isRequired": "TRUE",
            "description": ""
          },
          {
            "name": "배송지 주소",
            "slug": "receiver_address",
            "type": "text",
            "isRequired": "TRUE",
            "description": ""
          },
          {
            "name": "배송지 상세주소",
            "slug": "receiver_address2",
            "type": "text",
            "isRequired": "TRUE",
            "description": "상세 주소를 입력해주세요."
          }
        ]
      },
      {
        "formType": "CUSTOM",
        "json": [
          {
            "name": "강아지",
            "slug": "puppy",
            "type": "select",
            "isRequired": "FALSE",
            "description": "",
            "options" : [{"value":"y", "name":"Y"}, {"value":"n", "name":"N"}]
          },
          {
            "name": "고양이",
            "slug": "cat",
            "type": "text",
            "isRequired": "FALSE",
            "description": ""
          },
          {
            "name": "기한",
            "slug": "deadLine",
            "type": "date",
            "isRequired": "FALSE",
            "description": ""
          },
          {
            "name": "나이",
            "slug": "age",
            "type": "number",
            "isRequired": "TRUE"
          },
          {
           "name": "checkbox",
            "slug": "checkbox",
            "label": "checkbox",
            "type": "checkbox",
            "isRequired": "TRUE"
          },
          {
            "name":"radio",
            "slug":"radio",
            "type":"radio",
            "isRequired":"TRUE",
            "options" : [{"value":"y", "name":"Y"}, {"value":"n", "name":"N"}]
          },
          {
           "name": "switch",
            "slug": "switch",
            "label": "switch",
            "type": "switch",
            "isRequired": "TRUE",
            "formLabel":"switch"
          }
        ]
      }
    ]
  }
}`;
  const dynamicFields = JSON.parse(response).data;
  console.log(dynamicFields);
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <ApplyFormBuilder
      staticFields={staticFields}
      dynamicFields={dynamicFields}
      onSubmit={handleSubmit}
    />
  );
};

export const Base: Story = {
  name: '신청서 폼 빌더 테스트',
  decorators: [(Story) => <Story />],
  render: () => <BaseFormBuilder />,
};

type Story = StoryObj<typeof ApplyFormBuilder>;
