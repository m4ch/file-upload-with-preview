import { Options, PresetFiles, RequiredOptions } from './types/options';
export declare class FileUploadWithPreview {
    /**
     * Currently selected files
     *
     * @default []
     */
    cachedFileArray: File[];
    /**
     * Button to reset the instance
     */
    clearButton: Element;
    /**
     * Main container for the instance
     */
    el: Element;
    /**
     * Display panel for the images
     */
    imagePreview: HTMLDivElement;
    /**
     * Hidden input
     */
    inputHidden: HTMLInputElement;
    /**
     * Visible input
     */
    inputVisible: Element;
    options: RequiredOptions;
    /**
     * The `id` you set for the instance
     */
    uploadId: string;
    /**
     * The index of selected/favorite file.
     */
    selectedFileIndex: number | null;
    constructor(uploadId: string, options?: Options);
    bindClickEvents(): void;
    selectFileAtIndex(fileIndex: number): void;
    moveFileTo(fileIndex: number, moveIndex: number): void;
    addImagesFromPath(presetFiles: PresetFiles): void;
    addFiles(files: FileList | File[]): void;
    addFileToPreviewPanel(file: File, index: number): Promise<string>;
    replaceFiles(files: File[]): void;
    replaceFileAtIndex(file: File, index: number): void;
    deleteFileAtIndex(index: number): void;
    refreshPreviewPanel(): void;
    addBrowseButton(text: string): void;
    emulateInputSelection(): void;
    resetPreviewPanel(): void;
}
//# sourceMappingURL=file-upload-with-preview.d.ts.map