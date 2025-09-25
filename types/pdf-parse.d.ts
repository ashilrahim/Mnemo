declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PdfParseResult {
    numpages: number;
    numrender: number;
    info: unknown;
    metadata: unknown;
    version: string;
    text: string;
  }

  function pdfParse(
    data: Buffer | Uint8Array | ArrayBuffer,
    options?: Record<string, unknown>
  ): Promise<PdfParseResult>;

  export default pdfParse;
}



declare module "pdf-parse" {
  const pdfParse: (data: ArrayBuffer | Buffer | Uint8Array | string) => Promise<{ text: string }>;
  export default pdfParse;
}
