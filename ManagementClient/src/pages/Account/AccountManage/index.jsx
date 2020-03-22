import { Button, Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { columns } from './config/col-config-list';
import { queryRule, update, remove, add } from './service';

let localAction = null;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在新增');
  const res = await add({
    account_id: fields.account_id,
    account_pwd: fields.account_pwd,
    account_name: fields.account_name,
  });
  hide();
  if (res && !res.success) {
    return false;
  }
  message.success('新增成功');
  return true;
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在编辑');

  try {
    await update({
      account_id: fields.account_id,
      account_pwd: fields.account_pwd,
      account_name: fields.account_name,
    });
    hide();
    message.success('编辑成功');
    return true;
  } catch (error) {
    hide();
    message.error('编辑失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param account_id
 */

const handleRemove = async account_id => {
  const hide = message.loading('正在删除');
  try {
    await remove({
      account_id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState({});

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Button
        type="primary"
        onClick={() => {
          handleModalVisible(true);
        }}
      >
        添加课程负责人
      </Button>
    </div>
  );
  return (
    <PageHeaderWrapper content={headerContent}>
      <ProTable
        headerTitle={false}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => {
          localAction = action;
          return [];
        }}
        tableAlertRender={false}
        request={async params => {
          const data = await queryRule(params);
          return data;
        }}
        columns={[
          ...columns,
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
              <>
                <a
                  onClick={async () => {
                    await setUpdateModalValue(record);
                    setUpdateModalVisible(true);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={async () => {
                    const { account_id } = record;
                    await handleRemove(account_id);
                    localAction.resetPageIndex(1);
                    localAction.reload();
                  }}
                >
                  删除
                </a>
              </>
            ),
          },
        ]}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
      />
      <CreateForm
        onSubmit={async (value, callback) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            callback(true);
            localAction.resetPageIndex(1);
            localAction.reload();
          } else {
            callback(false);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {updateModalValue && Object.keys(updateModalValue).length ? (
        <UpdateForm
          onSubmit={async (value, callback) => {
            const success = await handleUpdate(value);
            if (success) {
              setUpdateModalVisible(false);
              setUpdateModalValue({});
              callback(true);
              localAction.resetPageIndex(1);
              localAction.reload();
            } else {
              setUpdateModalVisible(false);
              setUpdateModalValue({});
              callback(false);
            }
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
            setUpdateModalValue({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateModalValue}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
