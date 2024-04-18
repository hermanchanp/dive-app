
interface Diver {
    id: string;
    name: string;
    available: boolean;
    reason?: string;
    availableFrom?: string;
    updatedAt: Date;
    alignLeft: boolean;
}

export default Diver;