import request from '../../api/api';
import qs from 'qs';

const image_type = 'BASE64';

async function matchFace({stu_base64, imgUrl}) {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      img1: {
        image: stu_base64,
        image_type,
        face_type: 'CERT',
      },
      img2: {
        image: imgUrl,
        image_type,
        face_type: 'LIVE',
      },
    }),
  };
  return await request('/student/faceset/match', option);
}

export async function searchByFace({stu_id, imgUrl}) {
  const {
    success: success1,
    data: {stu_base64},
  } = await request(`/student/face?${qs.stringify({stu_id})}`);
  if (success1) {
    const {
      success: success2,
      data: {
        result: {score},
      },
    } = await matchFace({stu_base64, imgUrl});

    if (success2 && parseInt(score) >= 80) {
      return {
        success: true,
        message: '打卡成功',
      };
    } else {
      return {
        success: false,
        message: '打卡失败',
      };
    }
  } else {
    return {
      success: false,
      message: '您的人脸不在人脸库中，请联系管理员进行处理',
    };
  }
}
