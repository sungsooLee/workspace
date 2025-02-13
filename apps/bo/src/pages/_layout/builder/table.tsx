import { createFileRoute } from '@tanstack/react-router';
import useSearchBox from '../../../shared/ui/search-box/use-search-box';
import SearchBox from '../../../shared/ui/search-box';

import { useEffect, useCallback, useMemo } from 'react';
import TableBox from '../../../shared/ui/table-box';
import useTableBox from '../../../shared/ui/table-box/use-table-box';
import { queryOptions as userQueryOptions } from '../../../entities/api-mock/service/mock-user.queries';
import { queryOptions as codeQueryOptions } from '../../../entities/api-mock/service/mock-code.queries';
import { tableConfig, searchConfig } from '../../../entities/search-table-config';
import { formUtils } from '../../../entities/form-utils';
import { CODE_GROUP } from '@learnway/config';

export const Route = createFileRoute('/_layout/builder/table')({
  component: RouteComponent,
});

function RouteComponent() {
  const { config: sConfig } = useSearchBox(searchConfig);
  const { config: tConfig, fetch } = useTableBox(tableConfig);

  /**
   * @param data
   */
  const handleOnSearch = useCallback((data: any) => {
    console.log(data);

    fetch();
  }, []);
  useEffect(() => {
    console.log('now => ', formUtils.now());
  }, []);
  return (
    <div>
      <SearchBox config={sConfig} onSearch={handleOnSearch} />
      <TableBox config={tConfig} />
    </div>
  );
}
