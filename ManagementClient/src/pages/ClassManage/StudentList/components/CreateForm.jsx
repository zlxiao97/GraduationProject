import React, { useState } from 'react';
import difference from 'lodash/difference';
import { Modal, Transfer, Table, Tag } from 'antd';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: 'stu_code',
    title: '学号',
  },
  {
    dataIndex: 'stu_name',
    title: '姓名',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'stu_code',
    title: '学号',
  },
  {
    dataIndex: 'stu_name',
    title: '姓名',
  },
];

const CreateForm = props => {
  const { modalVisible, onSubmit: handleAdd, onCancel, data, selected } = props;
  const [targetKeys, setTargetKeys] = useState(selected);

  const onChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onOk = () => {
    handleAdd(targetKeys);
  };
  return (
    <Modal
      destroyOnClose
      title="添加学生"
      visible={modalVisible}
      centeredF
      width={1200}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
    >
      <div>
        <TableTransfer
          dataSource={data}
          targetKeys={targetKeys}
          disabled={false}
          showSearch={true}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.stu_code.indexOf(inputValue) !== -1 || item.stu_name.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </div>
    </Modal>
  );
};

export default CreateForm;
