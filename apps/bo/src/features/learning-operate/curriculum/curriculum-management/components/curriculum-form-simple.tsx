import React from 'react';
import { TreeNode } from '@learnway/ui';
import { BaseFormRow2 } from '@learnway/ui';
import { ContentsRow, FormRow2 } from '@shared/ui';
import { Input } from '@learnway/ui';

interface CurriculumFormSimpleProps {
  parentNode: TreeNode | null;
  selectedNode: TreeNode | null;
  isEditing: boolean;
  provider: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const CurriculumFormSimple: React.FC<CurriculumFormSimpleProps> = ({
  parentNode,
  selectedNode,
  isEditing,
  provider,
  onSubmit,
  onCancel,
}) => {
  // const handleSubmit = () => {
  //   const data = provider.getValues();
  //   onSubmit(data);
  // };

  return (
    <ContentsRow>
      <FormRow2
        provider={provider}
        name="curriculumName"
        label="커리큘럼명"
        // fieldConfig={{
        //   validation: { required: true },
        // }}
        validation={{ required: true }}
        element={<Input placeholder="커리큘럼명을 입력하세요" />}
      />
    </ContentsRow>
  );
};
