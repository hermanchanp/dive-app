
interface Diver {
    id: string;
    name: string;
    available: boolean;
    reason?: boolean;
    availableFrom?: string;
    updatedAt: Date;
    alignLeft: boolean;
}

export default Diver;