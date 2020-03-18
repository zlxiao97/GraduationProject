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
      title="新增课程"
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
          label="课程名称"
          name="course_name"
          rules={[
            {
              required: true,
              message: '请输入课程',
            },
          ]}
        >
          <Input placeholder="请输入课程" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
