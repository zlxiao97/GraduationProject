import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel } = props;

  const [formVals, setFormVals] = useState({
    stu_id: props.values.stu_id,
    stu_code: props.values.stu_code,
    stu_name: props.values.stu_name,
    stu_pwd: props.values.stu_pwd,
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
      title="编辑学生信息"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          stu_code: formVals.stu_code,
          stu_name: formVals.stu_name,
          stu_pwd: formVals.stu_pwd,
        }}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="学号"
          name="stu_code"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入学号" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="学生名称"
          name="stu_name"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入学生名称" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="学生密码"
          name="stu_pwd"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入学生密码" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
