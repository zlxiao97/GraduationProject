import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit: handleEdit, onCancel } = props;
  const [formVals, setFormVals] = useState({
    course_id: props.values.course_id,
    course_name: props.values.course_name,
  });
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    await setFormVals({ ...formVals, ...fieldsValue });
    handleEdit({ ...formVals, ...fieldsValue });
  };

  return (
    <Modal
      destroyOnClose
      title="编辑课程"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form
        form={form}
        initialValues={{
          course_name: formVals.course_name,
        }}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="课程名称"
          name="course_name"
          rules={[
            {
              required: true,
              message: '请输入中文姓名',
            },
          ]}
        >
          <Input placeholder="请输入中文姓名" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
