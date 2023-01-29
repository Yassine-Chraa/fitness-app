export default interface Meal {
    id: number;
    name: string;
    category: 'Fruits' | 'Vegetables' | 'Grains' | 'Protein Foods' | 'Dairy';
    description: string;
    weight: number | null;
    isVegan: boolean
    created_at: string;
    updated_at: string;
}