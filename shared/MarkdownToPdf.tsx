import React from "react";
import {
  Document,
  Page,
  Text,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { markdownToPlainText } from "../shared/ReusableFunctions";
import pdfimage from "../assets/images/pdf.png";
import { Image } from "@chakra-ui/react";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  text: {
    fontSize: 12,
    padding: 5,
    marginBottom: 10,
  },
});

interface MyDocumentProps {
  content: string;
}

const MyDocument: React.FC<MyDocumentProps> = ({ content }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.text}>{content}</Text>
    </Page>
  </Document>
);

const MarkdownToPdf: React.FC<any> = ({ text }: any) => {
  const plainText = markdownToPlainText(text);
  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument content={plainText} />}
        fileName="resume.pdf"
      >
        {({ loading }) =>
          loading ? (
            "downloading..."
          ) : (
            <>
              <Image
                src={pdfimage}
                alt="image"
                borderRadius="12px"
                w={"16"}
                h={"16"}
              />
            </>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default MarkdownToPdf;
