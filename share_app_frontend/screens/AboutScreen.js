import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.description}>
        S.H.A.R.E. stands for "Shared Home Appliance Resource Exchange." Our
        platform encourages users to actively participate in a community-driven
        initiative that promotes ecological sustainability, cost-effectiveness,
        and space optimization. By sharing resources within your community, we
        provide a practical and socially engaging solution for resource
        exchange.
      </Text>
      <Text style={styles.description}>
        SHARE is an innovative borrowing and lending application meticulously
        crafted by third-year Software Engineering students at Lancaster
        University Leipzig. Our project is driven by the mission to provide a
        sophisticated communal borrowing and exchange solution, enabling
        individuals within a specific community to seamlessly borrow and lend
        items, and to foster a sense of community, where individuals can
        connect, share resources, and contribute to a more sustainable and
        interconnected way of living. Join us in creating a positive impact by
        embracing the S.H.A.R.E. lifestyle..
      </Text>
      <Text style={styles.description}>
      Our objective is to bridge the gap for individuals facing challenges
        such as temporary stays, insufficient resources including funds and
        space, and other constraints. SHARE stands as a technological and
        communal solution, offering a platform to foster community connections
        and resource accessibility.
        </Text>
      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70
  },
  
  description: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'justify',
  },
  version: {
    fontSize: 14,
    color: '#555',
  },
});

export default AboutScreen;