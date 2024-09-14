import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import docxImage from "../assets/images/docx.png";
import { Image, Spinner } from "@chakra-ui/react";

import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

interface RichTextRun {
  text: string;
  font: string;
  size: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  listItem?: boolean;
}

const markdownToRichText = (markdownText: string): RichTextRun[][] => {
  const tokens = md.parse(markdownText, {});
  const richText: RichTextRun[][] = [];
  let richTextParagraph: RichTextRun[] = [];

  const traverse = (tokens: any, richTextParagraph: RichTextRun[]) => {
    for (const token of tokens) {
      if (token.type === 'heading_open') {
        const headingLevel = +token.tag.slice(1);
        const fontSize = 28 - (headingLevel - 1) * 4;
        richTextParagraph.push({ text: '', font: 'Arial', size: fontSize, bold: true });
      } else if (token.type === 'heading_close') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: false });
      } else if (token.type === 'text') {
        richTextParagraph.push({ text: token.content, font: 'Arial', size: 22, bold: false, italic: false, underline: false });
      } else if (token.type === 'code_inline') {
        richTextParagraph.push({ text: token.content, font: 'Courier New', size: 22, bold: false, italic: false, underline: false });
      } else if (token.type === 'strong_open') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: true, italic: false, underline: false });
      } else if (token.type === 'strong_close') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: false, italic: false, underline: false });
      } else if (token.type === 'em_open') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: false, italic: true, underline: false });
      } else if (token.type === 'em_close') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: false, italic: false, underline: false });
      } else if (token.type === 'paragraph_open') {
        richText.push(richTextParagraph);
        richTextParagraph = [];
      } else if (token.type === 'paragraph_close') {
        richText.push(richTextParagraph);
        richTextParagraph = [];
      } else if (token.type === 'list_item_open') {
        richTextParagraph.push({ text: '- ', font: 'Arial', size: 22, bold: false, italic: false, underline: false, listItem: true });
      } else if (token.type === 'list_item_close') {
        richTextParagraph.push({ text: '', font: 'Arial', size: 22, bold: false, italic: false, underline: false, listItem: false });
      } else if (token.type === 'inline') {
        traverse(token.children, richTextParagraph);
      }
    }
  };

  richTextParagraph = [];
  traverse(tokens, richTextParagraph);

  return richText;
};

const MarkdownToWord: React.FC<{ text: string }> = ({ text }) => {
  if (!text) {
    return null;
  }
  const richText = markdownToRichText(text);

  const downloadDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: richText.map((richTextParagraph) => {
            return new Paragraph({
              children: richTextParagraph.map((richTextRun) => {
                return new TextRun({
                  text: richTextRun.text,
                  font: richTextRun.font,
                  size: richTextRun.size,
                  bold: richTextRun.bold,
                  italics: richTextRun.italic,
                  underline: richTextRun.underline ? { type: "single" } : undefined,
                });
              }),
            });
          }),
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <>
      {text ? (
        <>
          <div onClick={downloadDocx} style={{ cursor: "pointer" }}>
            <Image src={docxImage} alt="docx image" borderRadius="12px" w={"16"} h={"16"} />
          </div>
        </>
      ) : (
        <>
          <Spinner size={"xl"} />
        </>
      )}
    </>
  );
};

export default MarkdownToWord;