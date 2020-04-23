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

async function addRecord({
  lesson_id,
  stu_id,
  attendance_time,
  attendance_lat,
  attendance_lng,
  attendance_status = 0,
}) {
  return request('/student/record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lesson_id,
      stu_id,
      attendance_time,
      attendance_lat,
      attendance_lng,
      attendance_status,
    }),
  });
}

export async function searchByFace({
  stu_id,
  imgUrl,
  lesson_id,
  attendance_time,
  attendance_lat,
  attendance_lng,
}) {
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
      const {success, message} = await addRecord({
        lesson_id,
        stu_id,
        attendance_time,
        attendance_lat,
        attendance_lng,
      });
      console.log(success, message);
      if (success) {
        return {
          success: true,
          message: '打卡成功',
        };
      }
    }
    return {
      success: false,
      message: '打卡失败',
    };
  }
  return {
    success: false,
    message: '您的人脸不在人脸库中，请联系管理员进行处理',
  };
}
