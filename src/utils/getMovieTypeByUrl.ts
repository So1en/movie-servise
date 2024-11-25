export function getMediaTypeFromPath(path: string) {
    const regex = /^\/(movie|tv)(\/|$)/;
    const match = path.match(regex);

    return match ? match[1] : 'movie';
}