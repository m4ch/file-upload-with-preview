import { DEFAULT_INITIALIZED_OBJECT_OPTIONS } from '../jest/constants/file';
import { FileUploadWithPreview } from './index';
import { getFilenameFromPath } from './utils/file';

const TEST_ID = 'myTestImage';

describe('Module Actions', () => {
  beforeAll(() => {
    document.body.innerHTML =
      '<div class="custom-file-container" data-upload-id="myTestImage"></div>';
  });

  it('loads module', () => {
    expect.assertions(1);

    expect(FileUploadWithPreview).toBeTruthy();
  });

  it('initializes default options', () => {
    expect.assertions(2);

    const upload = new FileUploadWithPreview(TEST_ID);

    expect(upload.uploadId).toBe(TEST_ID);
    expect(upload.options).toMatchObject(DEFAULT_INITIALIZED_OBJECT_OPTIONS);
  });

  // Testing an actual file upload is tough - so we'll at least check that
  // the cachedFileArray can be pushed to.
  it('test that the cachedFileArray can be pushed to', () => {
    expect.assertions(2);

    const upload = new FileUploadWithPreview(TEST_ID);

    const file = new Blob([''], { type: 'image/jpeg' });
    const file1 = new Blob([''], { type: 'image/jpeg' });
    upload.cachedFileArray.push(file as File);
    upload.cachedFileArray.push(file1 as File);

    expect(upload.cachedFileArray.length).toBe(2);
    expect(upload.uploadId).toBe(TEST_ID);
  });

  it('clears an added file when the clear button is clicked', () => {
    expect.assertions(3);

    const upload = new FileUploadWithPreview(TEST_ID);

    const file = new Blob([''], { type: 'image/jpeg' });
    upload.cachedFileArray.push(file as File);
    expect(upload.cachedFileArray.length).toBe(1);

    const event = new Event('click', {
      bubbles: true,
      cancelable: true,
    });
    upload.clearButton.dispatchEvent(event);

    expect(upload.uploadId).toBe(TEST_ID);
    expect(upload.cachedFileArray).toEqual([]);
  });

  it('check if returns correct filename from url.', () => {
    const paths = [
      'https://images.unsplash.com/photo-1557090495-fc9312e77b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1632333650998-8842b63f5cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
    ];
    expect(getFilenameFromPath(paths[0])).toMatch('photo-1557090495-fc9312e77b28');
    expect(getFilenameFromPath(paths[1])).toMatch('photo-1632333650998-8842b63f5cfc');
  });

  it('check if default favorite select works.', () => {
    const upload = new FileUploadWithPreview(TEST_ID, {
      defaultSelectedFileIndex: 1,
      showFavoriteButton: true,
    });

    const file1 = new Blob([''], { type: 'image/jpeg' });
    upload.cachedFileArray.push(file1 as File);
    const file2 = new Blob([''], { type: 'image/jpeg' });
    upload.cachedFileArray.push(file2 as File);

    expect(upload.selectedFileIndex).toBe(1);

    upload.selectFileAtIndex(0);
    expect(upload.selectedFileIndex).toBe(0);

    upload.moveFileTo(0, 1);
    expect(upload.selectedFileIndex).toBe(1);

    upload.selectFileAtIndex(1);
    expect(upload.selectedFileIndex).toBeNull();
  });
});
