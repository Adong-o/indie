import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Surface, Text, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import useGameStore from '../store/gameStore';
import Adongo from '../components/Adongo';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { player, projects, currentProject } = useGameStore();
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);

  const totalMRR = projects.reduce((sum: number, project) => sum + project.revenue.mrr, 0);
  const totalCustomers = projects.reduce((sum: number, project) => sum + project.revenue.customers, 0);

  const tutorialSteps: Array<{ message: string; position: 'left' | 'right' }> = [
    {
      message: "Welcome to your dashboard! 👋 I'm Adongo, and I'll be your guide in the indie hacking journey. Here you can track all your projects and their performance.",
      position: 'left'
    },
    {
      message: "Let's start by creating your first project! Click the 'New Project' button to begin. Remember, start small but think big! 🚀",
      position: 'right'
    },
    {
      message: "Once you have projects running, you'll see their MRR and customer stats here. Marketing is key - we'll get to that soon! 📈",
      position: 'left'
    }
  ];

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Stats Overview */}
        <Surface style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total MRR</Text>
            <Text style={styles.statValue}>${totalMRR}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={styles.statValue}>${player?.currentMoney}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Customers</Text>
            <Text style={styles.statValue}>{totalCustomers}</Text>
          </View>
        </Surface>

        {/* Revenue Chart */}
        <Surface style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue Growth</Text>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                data: [
                  Math.max(0, totalMRR - 500),
                  Math.max(0, totalMRR - 300),
                  Math.max(0, totalMRR - 100),
                  Math.max(0, totalMRR - 50),
                  Math.max(0, totalMRR - 20),
                  totalMRR
                ]
              }]
            }}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={styles.chart}
            bezier
          />
        </Surface>

        {/* Projects List */}
        <View style={styles.projectsContainer}>
          <Title style={styles.sectionTitle}>Your Projects</Title>
          {projects.map((project: any) => (
            <Card key={project.id} style={styles.projectCard}>
              <Card.Content>
                <Title>{project.name}</Title>
                <Paragraph>MRR: ${project.revenue.mrr}</Paragraph>
                <Paragraph>Customers: {project.revenue.customers}</Paragraph>
                <View style={styles.adStats}>
                  <Text>Ad Performance:</Text>
                  {project.marketing.adSpent > 0 && (
                    <Text style={styles.adMetric}>
                      ${project.marketing.adSpent} spent →
                      {project.marketing.reach} reached →
                      {project.marketing.conversions} converted
                    </Text>
                  )}
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => {}}>View Details</Button>
                <Button onPress={() => {}}>Run Ads</Button>
              </Card.Actions>
            </Card>
          ))}
          <Button
            mode="contained"
            style={styles.newProjectButton}
            onPress={() => {}}
          >
            Create New Project
          </Button>
        </View>
      </ScrollView>

      {showTutorial && (
        <Adongo
          message={tutorialSteps[tutorialStep].message}
          onNext={handleNextTutorial}
          position={tutorialSteps[tutorialStep].position}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  statCard: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  projectsContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  projectCard: {
    marginBottom: 16,
  },
  adStats: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  adMetric: {
    marginTop: 4,
    color: '#666',
  },
  newProjectButton: {
    marginTop: 16,
  },
});

export default DashboardScreen;
