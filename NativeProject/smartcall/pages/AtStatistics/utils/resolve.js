export default data => {
  const {atCount, abCount} = data.reduce(
    ({atCount: atAcc, abCount: abAcc}, {attendance_status}) => {
      return {
        atCount: atAcc + (attendance_status ? 1 : 0),
        abCount: abAcc + (attendance_status ? 0 : 1),
      };
    },
    {atCount: 0, abCount: 0},
  );
  return {atCount, abCount};
};
