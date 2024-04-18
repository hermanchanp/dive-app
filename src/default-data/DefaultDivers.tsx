import Diver from "../entities/Diver";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1)

const DefaultDivers: Diver[] = [
    {
        id: "adam",
        name: "Adam",
        availableFrom: "0",
        available: false,
        updatedAt: new Date(yesterday),
        alignLeft: true,
    },
    {
        id: "andros",
        name: "Andros",
        availableFrom: "0",
        available: false,
        updatedAt: new Date(yesterday),
        alignLeft: false,
    },
    {
        id: "tomis",
        name: "Tomis",
        availableFrom: "0",
        available: false,
        updatedAt: new Date(yesterday),
        alignLeft: true,
    }
]

export default DefaultDivers;

