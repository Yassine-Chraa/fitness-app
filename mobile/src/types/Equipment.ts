export default interface Equipment {
    id: number;
    name: string;
    category: 'Core'| 'Chest'| 'Shoulder'| 'Biceps'| 'Triceps'| 'Back'| 'Forearms'| 'Upper legs'| 'Glutes'| 'Cardio'| 'Calves';
    description: string;
    amount: number | null;
    image: string | null;
    created_at: string;
    updated_at: string;
}