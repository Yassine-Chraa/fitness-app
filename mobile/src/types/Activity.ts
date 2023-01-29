export default interface Activity {
    id: number;
    name: string;
    category: 'Core'| 'Chest'| 'Shoulder'| 'Biceps'| 'Triceps'| 'Back'| 'Forearms'| 'Upper legs'| 'Glutes'| 'Cardio'| 'Calves';
    description: string;
    created_at: string;
    updated_at: string;
};