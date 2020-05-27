const schedule = require("node-schedule");
const moment = require("moment");
const uuid = require("../utils/uuid.js");

/**
 * 第一步： 读课程表，通过end_time筛选出当天的功课
 * 第二步： 创建一个以end_time为Key，功课数组为Value的map
 * 第三步： 为每个Key设置定时任务，将Value绑定到doJob的参数
 * 第四步： 当某个任务执行时，遍历对应功课数组，每次迭代执行以下操作：
 *  4.1. 通过功课id拿选课的stu_id数组和当天已打卡的stu_id数组
 *  4.2. 筛选出未打卡的stu_id数组
 *  4.3、遍历未打卡的stu_id数组，新增缺勤记录，以end_time作为attendance_time，经纬度不填
 * 结束
 */

const readLessons = async (fireDate) => {
  const { read } = require("../model/model.js")("lesson");
  const lessons = await read(-1, 10);
  return lessons.filter(({ end_time }) =>
    moment(+end_time).isBetween(moment(fireDate), moment(fireDate).endOf("day"))
  );
};

const getSchedulesMap = (lessons) =>
  lessons.reduce((acc, lesson) => {
    const { end_time } = lesson;
    const last = acc[end_time] || [];
    return {
      ...acc,
      [end_time]: [...last, lesson],
    };
  }, {});

const getBaseDate = (fireDate) => ({
  date: moment(fireDate).date(),
  month: moment(fireDate).month(),
  year: moment(fireDate).year(),
});
const getAllStudents = async ({ course_id }) => {
  const { read } = require("../model/model.js")("student2course");
  const students = await read(-1, 10, { course_id });
  return students.map(({ stu_id }) => stu_id);
};
const getAtStudents = async ({ lesson_id }, fireDate) => {
  const { read } = require("../model/model.js")("record");
  const students = await read(-1, 10, { lesson_id });
  const todays = students.filter(({ attendance_time }) =>
    moment(attendance_time).isBetween(
      moment(fireDate),
      moment(fireDate).endOf("day")
    )
  );
  return todays.map(({ stu_id }) => stu_id);
};
const getStStudents = (allStudents, atStudents) => {
  return allStudents.filter((stu_id) => !atStudents.includes(stu_id));
};
const createStRecord = async (stu_id, { end_time, lesson_id }) => {
  const { create } = require("../model/model.js")("record");
  const { affectedRows } = await create({
    attendance_id: uuid(),
    lesson_id,
    stu_id,
    attendance_status: 1,
    attendance_time: end_time,
    attendance_lat: 0,
    attendance_lng: 0,
  });
  if (affectedRows > 0) {
    console.log(
      `${moment().format(
        "YYYY-MM-DD HH:mm:SS"
      )}：添加了一条缺勤记录（学生id：${stu_id}）`
    );
  } else {
    console.error("缺勤记录添加失败");
  }
  return;
};
// TODO
const createStRecordForlesson = async (lesson, fireDate) => {
  const allStudents = await getAllStudents(lesson);
  const atStudents = await getAtStudents(lesson, fireDate);
  const stStudents = getStStudents(allStudents, atStudents);
  stStudents.forEach((stu_id) => createStRecord(stu_id, lesson));
};
const doJob = (lessons, fireDate) => {
  lessons.forEach((lesson) => {
    createStRecordForlesson(lesson, fireDate);
  });
};
const setScheduleJobs = ({ schedulesMap, date, month, year }) => {
  Object.entries(schedulesMap).map(([key, value]) => {
    const hour = moment(+key).hour();
    const minute = moment(+key).minute();
    const second = moment(+key).second();
    const time = moment({
      year,
      month,
      day: date,
      hour,
      minute,
      second,
    }).toDate();
    return schedule.scheduleJob(time, doJob.bind(null, value));
  });
};

const mainJob = async (fireDate) => {
  const lessons = await readLessons(fireDate);
  const schedulesMap = getSchedulesMap(lessons);
  setScheduleJobs({ ...getBaseDate(fireDate), schedulesMap });
};

const main = (fireDate) => {
  mainJob(fireDate);
};

module.exports = () => {
  schedule.scheduleJob("0 0 9 * * ?", main);
};
