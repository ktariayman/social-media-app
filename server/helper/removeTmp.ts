import * as fs from 'fs';

const removeTmp = (path: string): void => {
  fs.unlink(path, (err: NodeJS.ErrnoException | null) => {
    if (err) throw err;
  });
};
export default removeTmp