import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Surface, Text, Card, Title, Button, ProgressBar } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import useGameStore from '../store/gameStore';
import Adongo from '../components/Adongo';

const { width } = Dimensions.get('window');

const FinanceScreen = () => {
  const { player, projects } = useGameStore();
  const [showTip, setShowTip] = React.useState(true);

  const totalMRR = projects.reduce((sum: number, p: any) => sum + p.revenue.mrr, 0);
  const totalCosts = projects.reduce((sum: number, p: any) => sum + p.costs.total, 0);
  const profit = totalMRR - totalCosts;
  
  const expenses = {
    development: projects.reduce((sum: number, p: any) => sum + p.costs.development, 0),
    marketing: projects.reduce((sum: number, p: any) => sum + p.costs.marketing, 0),
    infrastructure: projects.reduce((sum: number, p: any) => sum + p.costs.infrastructure, 0),
  };

  const pieChartData = [
    {
      name: 'Development',
      cost: expenses.development,
      color: '#FF6B6B',
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Marketing',
      cost: expenses.marketing,
      color: '#4ECDC4',
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Infrastructure',
      cost: expenses.infrastructure,
      color: '#45B7D1',
      legendFontColor: '#7F7F7F',
    },
  ];

  const burnRate = totalCosts / 30; // Monthly costs
  const runway = player ? Math.floor(player.currentMoney / burnRate) : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Quick Stats */}
      <Surface style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={styles.statValue}>${player?.currentMoney.toLocaleString()}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>MRR</Text>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>
            ${totalMRR.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Costs</Text>
          <Text style={[styles.statValue, { color: '#F44336' }]}>
            ${totalCosts.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Profit</Text>
          <Text style={[styles.statValue, { color: profit >= 0 ? '#4CAF50' : '#F44336' }]}>
            ${profit.toLocaleString()}
          </Text>
        </View>
      </Surface>

      {/* Runway Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Runway</Title>
          <Text>You have {runway} days of runway remaining</Text>
          <ProgressBar
            progress={Math.min(runway / 180, 1)}
            color={runway > 90 ? '#4CAF50' : runway > 30 ? '#FFC107' : '#F44336'}
            style={styles.runwayBar}
          />
          <Text style={styles.burnRate}>
            Burn rate: ${burnRate.toFixed(2)}/day
          </Text>
        </Card.Content>
      </Card>

      {/* Revenue Chart */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Revenue Growth</Title>
          <LineChart
            data={{
              labels: ['6d', '5d', '4d', '3d', '2d', '1d', 'Now'],
              datasets: [{
                data: [
                  totalMRR * 0.7,
                  totalMRR * 0.8,
                  totalMRR * 0.85,
                  totalMRR * 0.9,
                  totalMRR * 0.95,
                  totalMRR * 0.98,
                  totalMRR
                ]
              }]
            }}
            width={width - 48}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Expenses Breakdown */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Expenses Breakdown</Title>
          <PieChart
            data={pieChartData}
            width={width - 48}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="cost"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Card.Content>
      </Card>

      {/* Financial Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Financial Actions</Title>
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.actionButton}
              icon="chart-line"
            >
              Invest
            </Button>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.actionButton}
              icon="bank"
            >
              Get Loan
            </Button>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.actionButton}
              icon="cash"
            >
              Cut Costs
            </Button>
          </View>
        </Card.Content>
      </Card>

      {showTip && (
        <Adongo
          message="Keep an eye on your runway! A healthy business should have at least 6 months of runway. Consider cutting costs or raising money if you're running low. 💰"
          onNext={() => setShowTip(false)}
          position="right"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  statCard: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    elevation: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  runwayBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  burnRate: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default FinanceScreen;
