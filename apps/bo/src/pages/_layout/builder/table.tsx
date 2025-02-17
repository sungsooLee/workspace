import { createFileRoute } from '@tanstack/react-router';
import useSearchBox from '../../../shared/ui/search-box/use-search-box';
import { SearchBox } from '../../../shared/ui/search-box';

import { useCallback, useEffect } from 'react';
import useTableBox from '../../../shared/ui/table-box/use-table-box';
import { searchConfig, tableConfig } from '../../../entities/search-table-config';
import { formUtils } from '../../../entities/form-utils';
import { TableBox } from '../../../shared/ui/table-box';

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
