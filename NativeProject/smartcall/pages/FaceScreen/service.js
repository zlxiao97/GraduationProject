import request from '../../api/api';

export async function regFace(
  image,
  image_type,
  group_id,
  user_id,
  user_info = {},
) {
  const path = '/faceset/add';
  const body = {
    image,
    image_type,
    group_id,
    user_id,
    user_info: JSON.stringify(user_info),
  };
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: Object.keys(body)
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`;
      })
      .join('&'),
  };
  return request(path, init);
}

export async function searchByFace(image, image_type, group_id) {
  const path = '/faceset/search';
  const body = {
    image,
    image_type,
    group_id,
  };
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: Object.keys(body)
      .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`;
      })
      .join('&'),
  };
  return request(path, init);
}
