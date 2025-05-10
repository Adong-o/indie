import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Surface,
  useTheme,
} from 'react-native-paper';
import useGameStore from '../store/gameStore';

const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const theme = useTheme();
  const createPlayer = useGameStore((state) => state.createPlayer);
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(5000);
  const [step, setStep] = useState(0);

  const handleStart = () => {
    createPlayer(name, budget);
    onComplete();
  };

  const steps = [
    {
      title: 'Welcome to Indie Hacker Journey! 🚀',
      content: 'Ready to start your entrepreneurial adventure? Let\'s get you set up!',
      input: (
        <TextInput
          label="What's your name?"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
      ),
    },
    {
      title: 'Starting Budget 💰',
      content: 'How much money are you starting with? Choose wisely!',
      input: (
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>Starting Budget</Text>
          <TextInput
            label="Enter amount ($1,000 - $10,000)"
            value={budget.toString()}
            onChangeText={(text) => {
              const value = parseInt(text.replace(/[^0-9]/g, '')) || 0;
              setBudget(Math.min(Math.max(value, 1000), 10000));
            }}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          <Text style={styles.budgetNote}>Min: $1,000 - Max: $10,000</Text>
        </View>
      ),
    },
    {
      title: 'Ready to Begin! 🎮',
      content: `Perfect! You'll start with $${budget}. Remember:
      
• Start small and validate your ideas
• Learn from your failures
• Keep your costs low
• Focus on providing value

Are you ready to begin your indie hacking journey?`,
      input: null,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.card}>
          <Text style={styles.title}>{steps[step].title}</Text>
          <Text style={styles.content}>{steps[step].content}</Text>
          {steps[step].input}
          <View style={styles.buttonContainer}>
            {step > 0 && (
              <Button
                mode="outlined"
                onPress={() => setStep(step - 1)}
                style={styles.button}
              >
                Back
              </Button>
            )}
            <Button
              mode="contained"
              onPress={() => {
                if (step === steps.length - 1) {
                  handleStart();
                } else {
                  setStep(step + 1);
                }
              }}
              disabled={step === 0 && !name}
              style={styles.button}
            >
              {step === steps.length - 1 ? 'Start Journey' : 'Next'}
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  budgetContainer: {
    marginBottom: 20,
    width: '100%',
  },
  budgetText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  budgetNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    minWidth: 120,
  },
});

export default WelcomeScreen;
