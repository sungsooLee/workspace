import { forwardRef } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import { Editor, EditorProps } from '../../editor/editor';

export interface EditorFormFieldProps extends BaseFormFieldProps<any> {
  editorProps?: EditorProps;
}

/**
 * 공통 Form Textarea
 * @param value
 * @param onChange
 * @param props
 * @constructor
 */
const EditorFormFieldComponent = forwardRef<HTMLTextAreaElement, EditorFormFieldProps>(
  ({ value, onChange: ownerOnChange, ...props }, ref) => {
    const handleBlur = (json: any) => {
      console.log('EditorFormFieldComponent.handleBlur', json);
      ownerOnChange?.(json);
    };

    return <Editor value={value} onBlur={handleBlur} />;
  },
);
export const EditorFormField = EditorFormFieldComponent;
