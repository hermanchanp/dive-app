import Diver from "../entities/Diver";

export const diveCount = (divers: Diver[]) => {
    let count = divers.filter((diver) => diver.available).length;
    return count;
  }

export const isYesterday = (lastUpdated: string) => {
    const lastUpdatedDate = new Date(lastUpdated);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return lastUpdatedDate.getDate() === yesterday.getDate() &&
            lastUpdatedDate.getMonth() === yesterday.getMonth() &&
            lastUpdatedDate.getFullYear() === yesterday.getFullYear();
};

export const findClosestTime = (divers: Diver[]) => {
    try {

        const now = new Date();
        const closestDiver = divers.reduce((closest, diver) => {
        const diverTime = new Date(`1970-01-01T${diver.availableFrom}:00`);
        const closestTime = new Date(`1970-01-01T${closest.availableFrom}:00`);
        return Math.abs(now.getTime() - diverTime.getTime()) < Math.abs(now.getTime() - closestTime.getTime()) ? diver : closest;
        }, divers[0]);
        return closestDiver.availableFrom;
    } catch (e) {

    }

    return "";
}