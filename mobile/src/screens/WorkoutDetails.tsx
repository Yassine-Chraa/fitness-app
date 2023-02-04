import Screen from '../components/Screen';

const WorkoutDetails = ({route}: any) => {
  const {name} = route.params;
  return <Screen name={name} action="edit" backButton></Screen>;
};
export default WorkoutDetails;
