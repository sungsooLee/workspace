import Button from '../../components/button';
import { ReactComponent as Minus } from '../../assets/images/icons/minus-sign.svg';
import { ReactComponent as Plus } from '../../assets/images/icons/add-sign.svg';
import { useToolbarState } from '../..//context/toolbar.context';
import { useEffect, useMemo } from 'react';
import { $isTableSelection } from '@lexical/table';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  DEFAULT_FONT_SIZE,
  MAX_ALLOWED_FONT_SIZE,
  MIN_ALLOWED_FONT_SIZE,
} from '../..//config/toolbar.config';

enum UpdateFontSizeType {
  increment = 1,
  decrement,
}

/**
 * 폰트 사이즈 조절
 * @constructor
 */
const FontSize = () => {
  const [editor] = useLexicalComposerContext();
  const { toolbarState, updateToolbarState } = useToolbarState();
  const fontSize = useMemo(() => toolbarState.fontSize.slice(0, -2), [toolbarState.fontSize]);
  const [canDecrement, canIncrement] = useMemo(
    () => [Number(fontSize) <= MIN_ALLOWED_FONT_SIZE, Number(fontSize) >= MAX_ALLOWED_FONT_SIZE],
    [fontSize],
  );

  /**
   * 폰트 크기 업데이트를 위한  함수.
   * 입력 값(inputValue)이 있다면 calculateNextFontSize를 호출해서 새 폰트 크기를 계산하고, 선택된 영역의 폰트 크기를 업데이트.
   * 입력 값이 없으면 단순히 updateFontSizeInSelection을 호출해 현재 선택된 영역의 폰트 크기를 업데이트.
   * @param updateType
   * @param inputValue
   */
  const updateFontSize = (updateType: UpdateFontSizeType, inputValue: string) => {
    if (inputValue !== '') {
      const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
      updateFontSizeInSelection(editor, String(nextFontSize) + 'px', null);
    } else {
      updateFontSizeInSelection(editor, null, updateType);
    }
  };

  /**
   * 현재 폰트 크기와 업데이트 유형(증가/감소)에 따라 다음 폰트 크기를 계산.
   * decrement(감소)일 경우:
   * 폰트 크기가 특정 임계값을 넘었는지 확인하고, 단계적으로 크기를 줄임.
   * 최소값에 도달하면 더 이상 감소하지 않음.
   * increment(증가)일 경우:
   * 폰트 크기가 특정 임계값을 넘지 않았는지 확인하고, 단계적으로 크기를 늘림.
   * 최대값에 도달하면 더 이상 증가하지 않음.
   * @param currentFontSize
   * @param updateType
   */
  const calculateNextFontSize = (
    currentFontSize: number,
    updateType: UpdateFontSizeType | null,
  ) => {
    if (!updateType) {
      return currentFontSize;
    }

    let updatedFontSize: number = currentFontSize;
    switch (updateType) {
      case UpdateFontSizeType.decrement:
        switch (true) {
          case currentFontSize > MAX_ALLOWED_FONT_SIZE:
            updatedFontSize = MAX_ALLOWED_FONT_SIZE;
            break;
          case currentFontSize >= 48:
            updatedFontSize -= 12;
            break;
          case currentFontSize >= 24:
            updatedFontSize -= 4;
            break;
          case currentFontSize >= 14:
            updatedFontSize -= 2;
            break;
          case currentFontSize >= 9:
            updatedFontSize -= 1;
            break;
          default:
            updatedFontSize = MIN_ALLOWED_FONT_SIZE;
            break;
        }
        break;

      case UpdateFontSizeType.increment:
        switch (true) {
          case currentFontSize < MIN_ALLOWED_FONT_SIZE:
            updatedFontSize = MIN_ALLOWED_FONT_SIZE;
            break;
          case currentFontSize < 12:
            updatedFontSize += 1;
            break;
          case currentFontSize < 20:
            updatedFontSize += 2;
            break;
          case currentFontSize < 36:
            updatedFontSize += 4;
            break;
          case currentFontSize <= 60:
            updatedFontSize += 12;
            break;
          default:
            updatedFontSize = MAX_ALLOWED_FONT_SIZE;
            break;
        }
        break;

      default:
        break;
    }
    return updatedFontSize;
  };

  /**
   * 에디터가 수정 가능한 상태인지 확인한 뒤, 선택 영역의 스타일(font-size)을 업데이트.
   * 입력된 새로운 폰트 크기를 editor.update를 통해 에디터 내부 상태에 반영.
   * @param editor
   * @param newFontSize
   * @param updateType
   */
  const updateFontSizeInSelection = (
    editor: LexicalEditor,
    newFontSize: string | null,
    updateType: UpdateFontSizeType | null,
  ) => {
    editor.update(() => {
      if (editor.isEditable()) {
        const selection = $getSelection();
        const nextFontSize = newFontSize || DEFAULT_FONT_SIZE + 'px';
        updateToolbarState('fontSize', nextFontSize);
        if (selection !== null) {
          $patchStyleText(selection, {
            'font-size': nextFontSize,
          });
        }
      }
    });
  };

  /**
   * 선택된 영역의 현재 스타일 속성(font-size)을 가져와서 툴바 상태를 업데이트.
   * 이를 통해 사용자에게 현재 폰트 크기 정보를 UI로 표시.
   */
  const updateSelectionFontSize = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      updateToolbarState(
        'fontSize',
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
      );
    }
  };

  /**
   * 에디터 명령(SELECTION_CHANGE_COMMAND)을 등록해 선택 영역이 변경될 때마다 폰트 크기를 동기화.
   * 명령이 실행될 때마다 updateSelectionFontSize가 호출되어 툴바와 에디터 상태를 최신으로 유지.
   */
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateSelectionFontSize();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <div className={'flex items-center justify-center gap-1'}>
      <Button
        disabled={canDecrement}
        className={'h-full'}
        onClick={() => {
          updateFontSize(UpdateFontSizeType.decrement, fontSize);
        }}>
        <Minus className={'opacity-50'} />
      </Button>
      <input
        type="text"
        value={fontSize}
        className={
          'border-gray-10 hover:bg-gray-3 h-[22px] w-[31px] rounded-md border-2 text-center focus:outline-none'
        }
        readOnly={true}
        style={{ borderWidth: '1px' }}
      />
      <Button
        disabled={canIncrement}
        className={'h-full'}
        onClick={() => {
          updateFontSize(UpdateFontSizeType.increment, fontSize);
        }}>
        <Plus className={'opacity-50'} />
      </Button>
    </div>
  );
};

export default FontSize;
/*
  font-weight: 700;
  font-size: 14px;
  color: #777;
  border-radius: 5px;
  border-color: gray;
  height: 15px;
  padding: 2px 4px;
  text-align: center;
  width: 20px;
  align-self: center;

*/
