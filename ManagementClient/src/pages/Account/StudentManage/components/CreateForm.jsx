import React, { useState } from 'react';
import { Form, Input, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const FormItem = Form.Item;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const CreateForm = props => {
  const [form] = Form.useForm();
  const [imgUrl, setImgUrl] = useState('');
  const [faceImg, setFaceImg] = useState(null);
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const dragProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    action: 'http://120.26.77.19:3000/upload',
    onChange({ file }) {
      const { status, name, originFileObj, type } = file;
      if (status === 'done' && originFileObj) {
        getBase64(originFileObj, imageUrl => {
          setImgUrl(imageUrl);
        });
        if (originFileObj) {
          setFaceImg(
            new File([originFileObj], name, {
              type,
            }),
          );
        }
        message.success(`${name} 导入成功.`);
      } else if (status === 'error') {
        message.error(`${name} 导入失败.`);
      }
    },
    beforeUpload: file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('请导入JPEG格式或PNG格式的图片!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('图片大小必须小于10MB!');
      }
      return isJpgOrPng && isLt10M;
    },
  };

  const onCallback = ok => {
    if (ok) {
      form.resetFields();
    }
  };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    const value = {
      ...fieldsValue,
      faceImg,
    };
    handleAdd(value, onCallback);
  };

  return (
    <Modal
      destroyOnClose
      title="新增学生"
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
          label="密码"
          name="stu_pwd"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入密码" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="姓名"
          name="stu_name"
          rules={[
            {
              required: true,
              message: '输入不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="人脸图片"
          name="faceImg"
        >
          <Dragger {...dragProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">请点击或者拖拽文件至此处以导入图片</p>
            <p className="ant-upload-hint">支持格式为：jpeg/png，限制大小：10MB</p>
          </Dragger>
          {imgUrl ? <img src={imgUrl} alt="studentPhoto" style={{ width: '100%' }} /> : null}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
