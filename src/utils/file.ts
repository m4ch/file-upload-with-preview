export const generateUniqueId = () => Math.random().toString(16).slice(2);

export const getFilenameFromPath = (path: string): string => {
  try {
    const possibleFilename = path.split('#')[0]?.split('?')[0]?.split('/')?.pop();
    let filename = 'preset-file';
    if (possibleFilename !== undefined) {
      filename = possibleFilename;
    }
    return filename;
  } catch (err) {
    console.warn('Cannot parse filename: ', err);
    return 'preset-file';
  }
};
