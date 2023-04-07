export default interface Food {
  id: number;
  user_id: number;
  energy_consumed: number;
  protein_consumed: number;
  history_items: Array<object>;
  date: String;
}
