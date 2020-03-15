import { Button, Divider, message, Select, Input, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import data2ExcelJson from '@/utils/excel/data2ExcelJson';
import exportJson2Sheet from '@/utils/excel/exportJson2Sheet';
import { columns } from './config/col-config-list';
import { queryRule, updateRule, removeRule, add } from './service';
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

let localAction = null;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在新增');
  const res = await add({
    username: fields.username,
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
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
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
  const [datasource, setDatasource] = useState(null);
  const [keywordsValue, setKeywordsValue] = useState('');
  const [keywords, setKeywords] = useState('');

  const actionRef = useRef();

  const headerContent = (
    <div className="headerContent-wrapper">
      <Text>课程名称：</Text>
      <Select style={{ width: 150 }} onChange={val => {}} placeholder="请选择课程">
        <Option value="test" key="1">
          test
        </Option>
      </Select>
      <Text>功课名称：</Text>
      <Select style={{ width: 150 }} onChange={val => {}} placeholder="请选择功课">
        <Option value="test" key="1">
          test
        </Option>
      </Select>
      <Text>学号：</Text>
      <Input className="input-width" placeholder="请输入学号" onChange={e => {}}></Input>
      <Button
        type="primary"
        onClick={() => {
          setKeywordsValue('');
          setKeywords('');
          localAction.resetPageIndex(1);
        }}
      >
        查询
      </Button>
      <Button
        type="default"
        onClick={() => {
          setKeywordsValue('');
          setKeywords('');
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
      <div className="pageHeaderWrapper-fix-ahead-panel">
        <Button
          type="primary"
          onClick={() => {
            const body = data2ExcelJson(datasource, columns);
            const headerOrder = ['规则名称', '描述', '服务调用次数', '状态', '上次调度时间'];
            const sheetname = '范例报表';
            const filename = '范例报表';
            return exportJson2Sheet(body, headerOrder, sheetname, filename);
          }}
        >
          导出报表
        </Button>
      </div>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{ fullScreen: false, reload: true, setting: true }}
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
          keywords,
        }}
        toolBarRender={(action, { selectedRows }) => {
          localAction = action;
          return [
            <Text>学生名称：</Text>,
            <Search
              placeholder="搜索..."
              onSearch={val => {
                setKeywords(val);
              }}
              onChange={e => {
                setKeywordsValue(e.target.value);
              }}
              value={keywordsValue}
              style={{ width: 200 }}
            />,
          ];
        }}
        tableAlertRender={false}
        request={async params => {
          const data = await queryRule(params);
          const { data: datasource2 } = data;
          await setDatasource(datasource2);
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
                  onClick={() => {
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                  }}
                >
                  配置
                </a>
                <Divider type="vertical" />
                <a href="">订阅警报</a>
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
            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            callback(false);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
