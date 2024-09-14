import { pdfjs } from "react-pdf";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import remarkGfm from "remark-gfm";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

// Load PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const MarkdownViewer = ({ markdownText }: any) => {
  return (
    <ReactMarkdown
      children={markdownText}
      components={ChakraUIRenderer()}
      remarkPlugins={[remarkGfm]}
    />
  );
};

export const markdownToPlainText = (markdown: any) => {
  const plainText =
    markdown &&
    markdown
      .replace(/#{1,3} (.+?)\n/g, "$1\n")
      .replace(/(\*|_){2}(.+?)(\*|_){2}/g, "$2")
      .replace(/(\*|_)(.+?)(\*|_)/g, "$2")
      .replace(/!\[.*?\]\((.*?)\)/g, "$1")
      .replace(/\[.*?\]\((.*?)\)/g, "$1")
      .replace(/`(.+?)`/g, "$1");

  return plainText;
};

export const extractTextFromPdf = async (file: File | undefined) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const arrayBuffer: any = event.target.result;
          try {
            const pdf = await pdfjs.getDocument(new Uint8Array(arrayBuffer))
              .promise;
            let extractedText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              textContent.items.forEach((textItem: any) => {
                extractedText += textItem.str + " ";
              });
            }
            resolve(extractedText);
          } catch (error) {
            reject(error);
          }
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("No file provided"));
    }
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

const readDocxFile = async (arrayBuffer: ArrayBuffer) => {
  const zip = new PizZip(arrayBuffer);
  const doc = new Docxtemplater().loadZip(zip);
  doc.setData({});
  doc.render();
  const textContent = doc.getFullText();
  return textContent;
};

export const extractTextFromWordFile = async (file: File): Promise<string | null> => {
  try {
    if (file.name.endsWith(".docx")) {
      const arrayBuffer = await file.arrayBuffer();
      const textContent = await readDocxFile(arrayBuffer);
      return textContent;
    } else {
      throw new Error("Unsupported file format. Only .docx files are supported.");
    }
  } catch (error) {
    console.error("Error extracting text from Word file:", error);
    return null;
  }
};

