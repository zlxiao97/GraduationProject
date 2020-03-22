import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';
const { Password } = Input;
const FormItem = Form.Item;

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel } = props;

  const [formVals, setFormVals] = useState({
    account_id: props.values.account_id,
    account_pwd: props.values.account_pwd,
    account_name: props.values.account_name,
  });

  const resetForm = () => {
    form.resetFields();
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    await setFormVals({ ...formVals, ...fieldsValue });
    handleEdit({ ...formVals, ...fieldsValue }, resetForm);
  };

  return (
    <Modal
      destroyOnClose
      title="编辑账号"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          account_pwd: formVals.account_pwd,
          account_name: formVals.account_name,
        }}
      >
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
          label="负责人姓名"
          name="account_name"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入负责人姓名" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
