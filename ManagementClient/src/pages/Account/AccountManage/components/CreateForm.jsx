import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { Password } = Input;

const CreateForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const onCallback = ok => {
    if (ok) {
      form.resetFields();
    }
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    handleAdd(fieldsValue, onCallback);
  };

  return (
    <Modal
      destroyOnClose
      title="新增账号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="账号"
          name="account_id"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入账号" />
        </FormItem>
        <FormItem 
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="密码"
          name="account_pwd"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Password placeholder="请输入密码" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="姓名"
          name="account_name"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
