export default interface Exercise {
    id: number;
    title: string;
    api_id: string;
    description: string;
    category: 'Core'| 'Chest'| 'Shoulder'| 'Biceps'| 'Triceps'| 'Back'| 'Forearms'| 'Upper legs'| 'Glutes'| 'Cardio'| 'Calves';
    created_at: string;
    updated_at: string;
};