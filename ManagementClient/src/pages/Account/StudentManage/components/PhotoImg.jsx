import React, { useState } from 'react';
import { Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PhotoImg = props => {
  const [imgUrl, setImgUrl] = useState('');
  const [faceImg, setFaceImg] = useState(null);
  const { modalVisible, onSubmit: handleUpload, onCancel, stuId } = props;

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
        message.success(`${name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${name} 上传失败.`);
      }
    },
    beforeUpload: file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('请上传JPEG格式或PNG格式的图片!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('图片大小必须小于10MB!');
      }
      return isJpgOrPng && isLt10M;
    },
  };

  const okHandle = async () => {
    handleUpload({ stu_id: stuId, faceImg });
  };

  return (
    <Modal
      destroyOnClose
      title="上传图片"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Dragger {...dragProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">请点击或者拖拽文件至此处</p>
        <p className="ant-upload-hint">支持格式为：jpeg/png，限制大小：10MB</p>
      </Dragger>
      {imgUrl ? <img src={imgUrl} alt="studentPhoto" style={{ width: '100%' }} /> : null}
    </Modal>
  );
};

export default PhotoImg;
