import React from 'react';
import { Document, Page, Text, View, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontSize:"12px"
  },
  content: {
    padding: 10,
    flex: 1,
  },
  text: {
    marginBottom: 10,
  },
});

const PDFDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.content}>
        {data.map((item, index) => (
          <Text key={index} style={styles.text}>
            {`Name:${item.name} | Gender:${item.gender} | Species:${item.species} | Location:${item.location.name}`}
            <Image source={item.image} style={{height:"25px",width:"25px",borderRadius:"50",margin:"5px"}} />
          </Text>
          
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;