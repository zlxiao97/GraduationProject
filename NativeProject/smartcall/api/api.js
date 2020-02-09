const host = "http://120.26.77.19:3000";
const path = "/faceset/add";

export async function regFace(image,image_type,group_id,user_id,user_info={}){
    const body = {
        image,
        image_type,
        group_id,
        user_id,
        user_info: JSON.stringify(user_info)
    };
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: Object.keys(body).map(key=>{
            return `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`
        }).join('&')
    };
    const data = await fetch(`${host}${path}`,init);
    const json = data.json();
    return json;
}