import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
export interface ContractInfo {
  contractName?: string;
  orderingParty?: string;
  constructionSite?: string;
  businessType?: string;
  difficulty?: string;
  contractDescription?: string;
  clientType?: string;
  contractType?: string;
  productType?: string;
}

export interface PricingInfo {
  description?: string;
  currency?: string;
  contractPrice?: string;
  netPrice?: string;
  vat?: string;
}

export interface GuaranteeInfo {
  guaranteeType?: string;
  rate?: string;
  currency?: string;
  amount?: string;
  period?: string;
  institute?: string;
}

export interface DateInfo {
  contractDate?: string;
  contractPeriod?: string;
  effectiveDate?: string;
}

export interface SummarySection {
  summary?: string;
  notes?: string;
}
export interface ContractPdfProps {
  contractInfo?: ContractInfo;
  pricing?: PricingInfo;
  guarantees?: GuaranteeInfo;
  dateInfo?: DateInfo;
  summarySection?: SummarySection;
}

const styles = StyleSheet.create({
  document: {
    fontFamily: "Helvetica",
  },
  
  page: {
    padding: "10pt 10pt",
    fontSize: 10,
    color: "#333333",
    backgroundColor: "#FFFFFF",
  },

  headerContainer: {
    marginBottom: 10,
  },

  documentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    borderBottomStyle: "solid",
  },

  metadataContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 4,
    overflow: "hidden",
  },

  metadataRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },

  leftColumn: {
    width: "50%",
    flexDirection: "column",
  },

  rightColumn: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F8F9FA",
    borderLeftWidth: 1,
    borderLeftColor: "#DDDDDD",
  },
  metadataLabelCell: {
    width: "40%",
    padding: 8,
    backgroundColor: "#F8F9FA",
    fontWeight: "bold",
  },
  metadataValueCell: {
    width: "60%",
    padding: 8,
  },
  preparedByText: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  dateText: {
    color: "#777777",
    marginTop: 4,
  },
  section: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2C3E50",
    backgroundColor: "#F8F9FA",
    padding: "5pt 8pt",
    borderRadius: 3,
    marginBottom: 8,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  tableHeader: {
    backgroundColor: "#3498DB",
    color: "#FFFFFF",
  },
  tableHeaderCell: {
    padding: 8,
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCell: {
    padding: 4,
    borderWidth: 1,

    borderColor: "#DDDDDD",
  },
  highlightedCell: {
    backgroundColor: "#F8F9FA",
  },
  col5: { width: "5%" },
  col10: { width: "10%" },
  col12: { width: "12.5%" },
  col15: { width: "15%" },
  col16: { width: "16.666%" },
  col20: { width: "20%" },
  col25: { width: "25%" },
  col30: { width: "30%" },
  col33: { width: "33.333%" },
  col37: { width: "37.5%" },
  col40: { width: "40%" },
  col50: { width: "50%" },
  col60: { width: "60%" },
  col80: { width: "80%" },
  doubleRow: {
    flexDirection: "row",
  },
  
  summaryContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 4,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    minHeight: 100,
  },
  summaryLabel: {
    width: "20%",
    padding: 10,
    backgroundColor: "#F8F9FA",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#DDDDDD",
  },
  summaryContent: {
    width: "80%",
    padding: 10,
  },
  
});

const ContractInquiryForm: React.FC<ContractPdfProps> = ({
  contractInfo,
  pricing,
  guarantees,
  dateInfo,
  summarySection,
}) => (
  <Document style={styles.document}>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.documentTitle}>Contract Inquiry Form</Text>
        
        <View style={styles.metadataContainer}>
          <View style={styles.metadataRow}>
            <View style={styles.leftColumn}>
              <View style={styles.metadataRow}>
                <View style={styles.metadataLabelCell}>
                  <Text>Document No</Text>
                </View>
                <View style={styles.metadataValueCell}>
                  <Text>AUTO GEN</Text>
                </View>
              </View>
              <View style={styles.metadataRow}>
                <View style={styles.metadataLabelCell}>
                  <Text>Document Name</Text>
                </View>
                <View style={styles.metadataValueCell}>
                  <Text>Contract Inquiry Form</Text>
                </View>
              </View>
              <View style={styles.metadataRow}>
                <View style={styles.metadataLabelCell}>
                  <Text>Author</Text>
                </View>
                <View style={styles.metadataValueCell}>
                  <Text>Create User</Text>
                </View>
              </View>
              <View style={[styles.metadataRow, { borderBottomWidth: 0 }]}>
                <View style={styles.metadataLabelCell}>
                  <Text>Request Title</Text>
                </View>
                <View style={styles.metadataValueCell}>
                  <Text>(Contract Code) Contract Inquiry Form</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.rightColumn}>
              <Text style={styles.preparedByText}>Prepared by:</Text>
              <Text>Thanh Tran</Text>
              {/* <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text> */}
            </View>
          </View>
        </View>
      </View>

      {/* Contract Information Section */}
      <View style={styles.section}> 
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col20, styles.metadataLabelCell]}>
              <Text>Contract Name</Text>
            </View>
            <View style={[styles.tableCell, styles.col80]}>
              <Text>(Contract Code) Contract Name</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col20, styles.metadataLabelCell]}>
              <Text>Ordering Party</Text>
            </View>
            <View style={[styles.tableCell, styles.col80]}>
              <Text>Null</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col20, styles.metadataLabelCell]}>
              <Text>Construction Site</Text>
            </View>
            <View style={[styles.tableCell, styles.col80]}>
              <Text>Null</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.table}>
          <View style={styles.doubleRow}>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Business Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Business Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Degree of difficulty</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Null</Text>
            </View>
          </View>
          <View style={styles.doubleRow}>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Contract Desc.</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Contract Description</Text>
            </View>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Client Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Client Type</Text>
            </View>
          </View>
          <View style={[styles.doubleRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Contract Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Contract Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col40, styles.metadataLabelCell]}>
              <Text>Product Type</Text>
            </View>
            <View style={[styles.tableCell, styles.col60]}>
              <Text>Product Type</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pricing Information Section */}
      <View style={styles.section}> 
        <View style={styles.table}>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableHeaderCell, styles.col20]}>
              <Text>Description</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col12,styles.tableCell]}>
              <Text>Currency</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col20,styles.tableCell]}>
              <Text>Contract Price(a+b)</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col37,styles.tableCell]}>
              <Text>Net Price(a)</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col12,styles.tableCell]}>
              <Text>VAT(b)</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col20]}>
              <Text>Client Description</Text>
            </View>
            <View style={[styles.tableCell, styles.col12]}>
              <Text>USD</Text>
            </View>
            <View style={[styles.tableCell, styles.col20]}>
              <Text>$10,000.00</Text>
            </View>
            <View style={[styles.tableCell, styles.col37]}>
              <Text>$8,333.33</Text>
            </View>
            <View style={[styles.tableCell, styles.col12]}>
              <Text>$1,666.67</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Guarantee Information Section */}
      <View style={styles.section}>
   
        <View style={styles.table}>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableHeaderCell, styles.col20]}>
              <Text>Guarantee Type</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col10]}>
              <Text>Rate</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col20]}>
              <Text>Currency</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col16]}>
              <Text>Amount</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col16]}>
              <Text>Period</Text>
            </View>
            <View style={[styles.tableHeaderCell, styles.col16]}>
              <Text>Institute</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.col20]}>
              <Text>Performance Bond</Text>
            </View>
            <View style={[styles.tableCell, styles.col10]}>
              <Text>10%</Text>
            </View>
            <View style={[styles.tableCell, styles.col20]}>
              <Text>USD</Text>
            </View>
            <View style={[styles.tableCell, styles.col16]}>
              <Text>$1,000.00</Text>
            </View>
            <View style={[styles.tableCell, styles.col16]}>
              <Text>12 months</Text>
            </View>
            <View style={[styles.tableCell, styles.col16]}>
              <Text>Bank of America</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Date Information Section */}
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.metadataLabelCell,styles.tableCell, styles.col12, ]}>
              <Text>Contract Date</Text>
            </View>
            <View style={[styles.tableCell, styles.col16]}>
              <Text>2023-11-15</Text>
            </View>
            <View style={[styles.metadataLabelCell,styles.tableCell, styles.col16, ]}>
              <Text>Contract Period</Text>
            </View>
            <View style={[styles.tableCell, styles.col25]}>
              <Text>2023-11-15 - 2024-11-14</Text>
            </View>
            <View style={[styles.metadataLabelCell,styles.tableCell, styles.col12, ]}>
              <Text>Effective Date</Text>
            </View>
            <View style={[styles.tableCell, styles.col16]}>
              <Text>2023-11-15</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contract Summary Section */}
      <View style={styles.section}> 
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLabel}>
              <Text>Summary</Text>
            </View>
            <View style={styles.summaryContent}>
              <Text>
                This contract involves the provision of consulting services for the development of a new software platform. 
                The scope includes requirements analysis, system design, and implementation support over a 12-month period. 
                All deliverables must meet the quality standards outlined in Appendix A of this contract.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Remarks Section */}
      <View style={styles.section}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryLabel}>
              <Text>Notes</Text>
            </View>
            <View style={styles.summaryContent}>
              <Text>
                1. Payment terms: 30% advance, 40% upon milestone completion, 30% upon final delivery.
                {"\n"}2. All changes must be requested through formal change orders.
                {"\n"}3. Confidentiality agreement remains in effect for 3 years post-contract.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ContractInquiryForm;