import { Button, Divider, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
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
    course_name: fields.course_name,
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
  const res = await update({
    course_id: fields.course_id,
    course_name: fields.course_name,
  });
  hide();
  if (res && !res.success) {
    return false;
  }
  message.success('编辑成功');
  return true;
};

/**
 *  删除节点
 * @param course_id
 */
const handleRemove = async course_id =>
  new Promise((resolve, reject) => {
    Modal.confirm({
      title: '删除课程',
      content: '确定删除该课程吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在删除');
        try {
          await remove({
            course_id,
          });
          hide();
          message.success('删除成功，即将刷新');
          resolve(true);
        } catch (error) {
          hide();
          message.error('删除失败，请重试');
          reject(new Error('删除失败'));
        }
      },
    });
  });
/**
 * 更新节点
 * @param fields
 */

const TableList = ({ account_id }) => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});
  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Button
        type="primary"
        onClick={() => {
          handleModalVisible(true);
        }}
      >
        创建课程
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
          const data = await queryRule({ ...params, account_id });
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
                    await setEditFormValues(record);
                    handleUpdateModalVisible(true);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <a
                  onClick={async () => {
                    await handleRemove(record.course_id);
                    localAction.resetPageIndex(1);
                    localAction.reload();
                  }}
                >
                  删除
                </a>
                <Divider type="vertical" />
                <a>学生名单</a>
                <Divider type="vertical" />
                <a>考勤规则</a>
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
          const success = await handleAdd({
            ...value,
            account_id,
          });
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
      {editFormValues && Object.keys(editFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setEditFormValues({});
              localAction.resetPageIndex(1);
              localAction.reload();
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setEditFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={editFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default connect(({ user: { currentUser: { account } } }) => ({
  account_id: account,
}))(TableList);
