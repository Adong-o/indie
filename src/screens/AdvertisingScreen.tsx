import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Surface, Text, Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import useGameStore from '../store/gameStore';
import Adongo from '../components/Adongo';

const AdvertisingScreen = () => {
  const { currentProject, spendMoney } = useGameStore();
  const [adBudget, setAdBudget] = useState('100');
  const [showTutorial, setShowTutorial] = useState(true);

  const calculateAdResults = (budget: number) => {
    // Simple algorithm to calculate ad results
    const baseReach = budget * 100; // Each $1 reaches 100 people
    const viralMultiplier = budget >= 100 ? 2.5 : 1; // Viral boost for $100+ ads
    const reach = Math.floor(baseReach * viralMultiplier);
    const conversionRate = 0.02 + (budget >= 100 ? 0.03 : 0); // Higher conversion for viral ads
    const conversions = Math.floor(reach * conversionRate);
    const mrrPerCustomer = 20; // Average MRR per customer

    return {
      reach,
      conversions,
      expectedMRR: conversions * mrrPerCustomer,
    };
  };

  const runAd = () => {
    const budget = Number(adBudget);
    if (spendMoney(budget)) {
      const results = calculateAdResults(budget);
      // Update project stats with results
      // This would be handled by the game store
      setShowTutorial(false);
    }
  };

  const previewResults = calculateAdResults(Number(adBudget));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Surface style={styles.mainCard}>
          <Title>Advertising Dashboard</Title>
          <Card style={styles.projectCard}>
            <Card.Content>
              <Title>{currentProject?.name}</Title>
              <Paragraph>Current MRR: ${currentProject?.revenue.mrr}</Paragraph>
              <Paragraph>Current Customers: {currentProject?.revenue.customers}</Paragraph>
            </Card.Content>
          </Card>

          <View style={styles.adSetup}>
            <Text style={styles.sectionTitle}>Set Up Your Ad Campaign</Text>
            <TextInput
              label="Ad Budget ($)"
              value={adBudget}
              onChangeText={setAdBudget}
              keyboardType="numeric"
              style={styles.input}
            />

            <Surface style={styles.previewCard}>
              <Text style={styles.previewTitle}>Expected Results:</Text>
              <Text>Reach: {previewResults.reach} people</Text>
              <Text>Estimated Conversions: {previewResults.conversions} customers</Text>
              <Text>Potential Additional MRR: ${previewResults.expectedMRR}</Text>
              {Number(adBudget) >= 100 && (
                <Text style={styles.viralNote}>
                  🚀 Viral Boost Applied! Your ad will get extra reach and conversions.
                </Text>
              )}
            </Surface>

            <Button
              mode="contained"
              onPress={runAd}
              style={styles.runButton}
              disabled={Number(adBudget) < 10}
            >
              Run Ad Campaign
            </Button>
          </View>
        </Surface>
      </ScrollView>

      {showTutorial && (
        <Adongo
          message="Pro tip: Spending $100 or more on an ad campaign can make it go viral! 
          This means more reach and better conversion rates. It's a great way to boost your MRR! 🚀"
          onNext={() => setShowTutorial(false)}
          position="right"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  projectCard: {
    marginVertical: 16,
  },
  adSetup: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  previewCard: {
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  viralNote: {
    marginTop: 8,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  runButton: {
    marginTop: 16,
  },
});

export default AdvertisingScreen;
