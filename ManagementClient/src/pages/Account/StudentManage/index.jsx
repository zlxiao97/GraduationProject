import { Button, Divider, message, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import PhotoImg from './components/PhotoImg';
import { columns } from './config/col-config-list';
import { queryRule, update, remove, add, upload } from './service';

const { Text } = Typography;

let localAction = null;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在新增');
  const res = await add({
    stu_code: fields.stu_code,
    stu_pwd: fields.stu_pwd,
    stu_name: fields.stu_name,
    faceImg: fields.faceImg,
  });
  hide();
  if (res && !res.success) {
    return false;
  }
  message.success('新增成功');
  return true;
};

/**
 * 上传图片
 * @param fields
 */
const handleUpload = async fields => {
  const hide = message.loading('正在上传');
  const res = await upload({
    stu_id: fields.stu_id,
    faceImg: fields.faceImg,
  });
  hide();
  if (res && !res.success) {
    return false;
  }
  message.success('上传服务器成功');
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
      stu_id: fields.stu_id,
      stu_code: fields.stu_code,
      stu_name: fields.stu_name,
      stu_pwd: fields.stu_pwd,
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
 * @param selectedRows
 */

const handleRemove = async stu_id => {
  const hide = message.loading('正在删除');
  try {
    await remove({
      stu_id,
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
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState({});
  const [stuCode, setStuCode] = useState('');
  const [stuCodeValue, setStuCodeValue] = useState('');
  const [stuId, setStuId] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>学号：</Text>
      <Input
        className="input-width"
        placeholder="请输入学号"
        value={stuCodeValue}
        onChange={e => {
          setStuCodeValue(e.target.value);
        }}
      ></Input>
      <Button
        type="primary"
        onClick={() => {
          setStuCode(stuCodeValue);
          localAction.resetPageIndex(1);
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setStuCode('');
          setStuCodeValue('');
          localAction.resetPageIndex(1);
        }}
      >
        重置
      </Button>
      <Button
        type="primary"
        onClick={() => {
          handleModalVisible(true);
        }}
      >
        创建学生
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
          stu_code: stuCode,
        }}
        tableAlertRender={false}
        toolBarRender={action => {
          localAction = action;
          return [];
        }}
        request={params => queryRule(params)}
        columns={[
          ...columns,
          {
            title: '人脸图片',
            dataIndex: 'face',
            valueType: 'option',
            render: (_, record) => (
              <>
                {record.stu_img ? (
                  <a
                    onClick={() => {
                      window.open(`/uploads/${record.stu_img}`);
                    }}
                  >
                    预览
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      message.warning('该学生图片还未上传');
                    }}
                  >
                    预览
                  </a>
                )}

                <Divider type="vertical" />
                <a
                  onClick={async () => {
                    await setStuId(record.stu_id);
                    setUploadModalVisible(true);
                  }}
                >
                  上传
                </a>
              </>
            ),
          },
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
                    const { stu_id } = record;
                    await handleRemove(stu_id);
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
      {stuId ? (
        <PhotoImg
          stuId={stuId}
          onSubmit={async value => {
            const success = await handleUpload(value);
            if (success) {
              setUploadModalVisible(false);
              setStuId('');
              localAction.resetPageIndex(1);
              localAction.reload();
            }
          }}
          onCancel={() => setUploadModalVisible(false)}
          modalVisible={uploadModalVisible}
        />
      ) : null}
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
