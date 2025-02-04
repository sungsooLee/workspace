import { createFileRoute } from '@tanstack/react-router';
import useSearchBox from '../../../widgets/layout/ui/search-box/use-search-box';
import SearchBox from '../../../widgets/layout/ui/search-box';

import { useEffect, useCallback, useMemo } from 'react';
import TableBox from '../../../widgets/layout/ui/table-box';
import useTableBox from '../../../widgets/layout/ui/table-box/use-table-box';
import { queryOptions as userQueryOptions } from '../../../entities/api-mock/service/mock-user.queries';
import { queryOptions as codeQueryOptions } from '../../../entities/api-mock/service/mock-code.queries';
import { tableConfig, searchConfig } from '../../../entities/search-table-config';
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

  return (
    <div>
      <SearchBox config={sConfig} onSearch={handleOnSearch} />
      <TableBox config={tConfig} />
    </div>
  );
}
