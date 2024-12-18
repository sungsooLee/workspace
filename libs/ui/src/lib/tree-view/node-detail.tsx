import { useEffect, useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { Card, CardContent } from '../shadcn/card';
import { Label } from '../shadcn/label';
import Input from '../input/input';
import { Button } from '../shadcn/button';

const NodeDetail = ({ selectedNode, onAdd, onDelete, onSave, expandAll, collapseAll }: any) => {
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setEditTitle(selectedNode.title);
    }
  }, [selectedNode]);

  const handleAddNode = () => {
    if (newNodeTitle.trim()) {
      setNewNodeTitle('');

      onAdd(newNodeTitle.trim());
    }
  };

  const handleSaveTree = () => {
    onSave();
  };

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

          <div className="text-sm text-gray-500">키: {selectedNode && selectedNode.key}</div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>새 노드 제목</Label>
            <Input
              value={newNodeTitle}
              onChange={(e) => setNewNodeTitle(e.target.value)}
              placeholder="새 노드 이름"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <Button className="w-full" onClick={handleAddNode}>
            <Plus className="w-4 h-4 mr-2" /> 노드 추가
          </Button>
          {selectedNode && (
            <Button variant="destructive" className="w-full" onClick={() => onDelete(selectedNode)}>
              <Trash className="w-4 h-4 mr-2" />
              노드 삭제
            </Button>
          )}
        </div>
        <div className="flex flex-row space-x-2">
          <Button className="w-full" onClick={handleExpand}>
            노드 펼치기
          </Button>
          <Button variant="destructive" className="w-full" onClick={handleCollapse}>
            노드 접기
          </Button>
        </div>
        <Button className="w-full" onClick={handleSaveTree}>
          트리 저장
        </Button>
      </CardContent>
    </Card>
  );
};

export { NodeDetail };
