import { FC } from 'react';

const TableBoxComponent: FC<any> = ({ config }) => {
  console.log('table box');
  return (
    <div className={'table-container'}>
      {config.isFetching ? 'Fetching...' : null}
      {config.data && (
        <table>
          <colgroup>
            {config.builders.map((builder: any) =>
              builder.width ? (
                <col key={builder.name} width={builder.width} />
              ) : (
                <col key={builder.name} />
              ),
            )}
            <col width={'50px'} />
            <col />
            <col />
            <col width={'100px'} />
          </colgroup>
          <thead>
            <tr>
              {config.builders.map((builder: any) => (
                <th key={builder.name}>{builder.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.data.map((row: any, row_index: number) => (
              <tr key={row_index}>
                {config.builders.map((builder: any, col_index: number) => (
                  <td key={`${row_index}_${col_index}`}>{row[builder.name]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>1</td>
              <td>
                <select />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
export const TableBox = TableBoxComponent;
