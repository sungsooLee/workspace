import { Card, CardContent } from '../shadcn/card';
import { Button } from '../shadcn/button';

const NodeDetail = ({ expandAll, collapseAll }: any) => {
  const handleExpand = () => {
    expandAll();
  };

  const handleCollapse = () => {
    collapseAll();
  };

  return (
    <Card className="w-80">
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">현재 노드 정보</h3>
        </div>
        <div className="flex flex-row space-x-2">
          <Button className="w-full" onClick={handleExpand}>
            노드 펼치기
          </Button>
          <Button variant="destructive" className="w-full" onClick={handleCollapse}>
            노드 접기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { NodeDetail };
