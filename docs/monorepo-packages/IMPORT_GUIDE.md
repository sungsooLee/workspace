# UI Library Import 가이드

## 번들 사이즈 최적화를 위한 Import 방식 변경

모노레포의 번들 사이즈 최적화를 위해 barrel export 방식에서 직접 경로 import 방식으로 변경되었습니다.

## 자주 사용되는 컴포넌트 (Barrel Export 유지)

다음 컴포넌트들은 자주 사용되므로 기존처럼 barrel export로 import 가능합니다:

```typescript
import {
  Button,
  Input,
  InputTimer,
  Checkbox,
  Switch,
  Dropdown,
  Avatar,
  Spinner,
  Popover,
  Modal,
  ModalContainer,
  ModalBody,
  ModalTitle,
  ModalFooter,
  useModal,
  Toast,
  showToast,
  useToast,
  DynamicFormField,
  ContentsRow,
  Textarea,
  Chip,
  ChipList,
  Tabs,
  EmptyText,
  ProgressBar,
  ProgressCheck,
} from '@learnway/ui';
```

## 직접 경로 Import가 필요한 컴포넌트

위에 없는 컴포넌트들은 직접 경로로 import 해야 합니다:

### 예시

```typescript
// Accordion
import { Accordion } from '@learnway/ui/lib/accordion/accordion';

// Alert
import { Alert } from '@learnway/ui/lib/alert/alert';

// Attachment
import { Attachment } from '@learnway/ui/lib/attachment/attachment';
import { SingleAttachment } from '@learnway/ui/lib/attachment/single-attachment';

// AutoComplete
import { AutoComplete } from '@learnway/ui/lib/auto-complete/auto-complete';

// Badge
import { Badge } from '@learnway/ui/lib/badge/badge';

// Breadcrumb
import { Breadcrumb } from '@learnway/ui/lib/breadcrumb/breadcrumb';

// Card
import { Card } from '@learnway/ui/lib/card/card';

// Carousel
import { Carousel } from '@learnway/ui/lib/carousel/carousel';

// DatePicker
import { DatePicker } from '@learnway/ui/lib/date-picker/date-picker';
import { RangeDatePicker } from '@learnway/ui/lib/date-picker/range-date-picker';
import { TimePicker } from '@learnway/ui/lib/date-picker/time-picker';

// Editor
import { Editor } from '@learnway/ui/lib/editor/editor';

// Grid
import { Grid } from '@learnway/ui/lib/grid/grid';
import { GridBox } from '@learnway/ui/lib/grid/grid-box/grid-box';

// List
import { List } from '@learnway/ui/lib/list/list';

// Pagination
import { Pagination } from '@learnway/ui/lib/pagination/pagination';

// Panel
import { Panel } from '@learnway/ui/lib/panel/panel';

// PhoneNumber
import { PhoneNumber } from '@learnway/ui/lib/phone-number/phone-number';

// Radio
import { RadioCard } from '@learnway/ui/lib/radio-card/radio-card';
import { RadioGroup } from '@learnway/ui/lib/radio-group/radio-group';

// Rating
import { StarRating } from '@learnway/ui/lib/rating/star-rating';

// Stepper
import { Stepper } from '@learnway/ui/lib/stepper/stepper';

// Thumbnail
import { Thumbnail } from '@learnway/ui/lib/thumbnail/thumbnail';
import { ThumbnailList } from '@learnway/ui/lib/thumbnail/thumbnail-list';

// Tooltip
import { Tooltip } from '@learnway/ui/lib/tooltip/tooltip';

// Tree
import { Tree } from '@learnway/ui/lib/tree-view/tree';
import { DndTree } from '@learnway/ui/lib/tree-view/dnd-tree';

// Video Player
import { VideoPlayer } from '@learnway/ui/lib/video-player/video-player';

// 기타 컴포넌트들...
```

## 타입 Import

타입들도 직접 경로로 import 해야 합니다:

```typescript
// 예시
import { SelectOption } from '@learnway/ui/lib/dropdown/dropdown';
import { PhoneNumberValue } from '@learnway/ui/lib/phone-number/phone-number';
import { FileItem } from '@learnway/ui/lib/file-upload/uppy-file-upload';
```

## 주의사항

1. 번들 사이즈 최적화를 위해 꼭 필요한 컴포넌트만 import 하세요.
2. 자주 사용되지 않는 컴포넌트는 반드시 직접 경로로 import 하세요.
3. import 경로가 길어지더라도 번들 사이즈 감소 효과가 더 큽니다.

## TypeScript 설정

직접 경로 import가 제대로 동작하려면 `tsconfig.json`의 `paths` 설정이 올바르게 되어 있어야 합니다:

```json
{
  "compilerOptions": {
    "paths": {
      // "@learnway/ui": ["libs/ui/src/index.ts"],
      "@learnway/ui/*": ["libs/ui/src/*"]
    }
  }
}
```
