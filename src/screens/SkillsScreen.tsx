import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Surface, Text, Card, Title, Button, ProgressBar, Avatar, List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useGameStore from '../store/gameStore';
import Adongo from '../components/Adongo';

const { width } = Dimensions.get('window');

const SkillsScreen = () => {
  const { player } = useGameStore();
  const [showTip, setShowTip] = React.useState(true);

  const skills = [
    {
      name: 'Development',
      level: 3,
      maxLevel: 5,
      icon: 'code-tags',
      color: '#6200ee',
      skills: ['Frontend', 'Backend', 'Mobile', 'DevOps']
    },
    {
      name: 'Marketing',
      level: 2,
      maxLevel: 5,
      icon: 'bullhorn',
      color: '#03dac6',
      skills: ['SEO', 'Social Media', 'Content', 'Analytics']
    },
    {
      name: 'Business',
      level: 1,
      maxLevel: 5,
      icon: 'briefcase',
      color: '#018786',
      skills: ['Strategy', 'Finance', 'Sales', 'Legal']
    }
  ];

  const achievements = [
    {
      title: 'First Launch',
      description: 'Launch your first project',
      icon: 'rocket-launch',
      unlocked: true,
      reward: '+100 XP'
    },
    {
      title: 'Revenue Milestone',
      description: 'Reach $1,000 MRR',
      icon: 'cash-multiple',
      unlocked: false,
      reward: '+500 XP'
    },
    {
      title: 'Marketing Guru',
      description: 'Get 1,000 users from a single marketing campaign',
      icon: 'trophy',
      unlocked: false,
      reward: '+300 XP'
    }
  ];

  const renderSkillProgress = (skill: typeof skills[0]) => (
    <Card style={styles.skillCard} key={skill.name}>
      <Card.Content>
        <View style={styles.skillHeader}>
          <Avatar.Icon 
            size={40} 
            icon={skill.icon} 
            style={{ backgroundColor: skill.color }} 
          />
          <View style={styles.skillTitleContainer}>
            <Title>{skill.name}</Title>
            <Text>Level {skill.level}</Text>
          </View>
        </View>
        <ProgressBar
          progress={skill.level / skill.maxLevel}
          color={skill.color}
          style={styles.progressBar}
        />
        <View style={styles.subSkills}>
          {skill.skills.map((subSkill, index) => (
            <View key={subSkill} style={styles.subSkillItem}>
              <MaterialCommunityIcons
                name={index < skill.level ? 'star' : 'star-outline'}
                size={16}
                color={skill.color}
              />
              <Text style={styles.subSkillText}>{subSkill}</Text>
            </View>
          ))}
        </View>
        <Button
          mode="outlined"
          onPress={() => {}}
          style={{ marginTop: 8 }}
          color={skill.color}
        >
          Train ({(skill.level + 1) * 100} XP)
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      {/* XP Progress */}
      <Surface style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Avatar.Icon 
            size={60} 
            icon="star" 
            style={styles.xpIcon} 
          />
          <View style={styles.xpInfo}>
            <Title>Level {player?.level || 1}</Title>
            <Text>{player?.xp || 0} XP</Text>
          </View>
        </View>
        <ProgressBar
          progress={0.7}
          color="#FFD700"
          style={styles.xpProgress}
        />
        <Text style={styles.xpNeeded}>300 XP to next level</Text>
      </Surface>

      {/* Skills */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Skills</Title>
        {skills.map(renderSkillProgress)}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Achievements</Title>
        {achievements.map((achievement) => (
          <List.Item
            key={achievement.title}
            title={achievement.title}
            description={achievement.description}
            left={props => (
              <List.Icon
                {...props}
                icon={achievement.icon}
                color={achievement.unlocked ? '#4CAF50' : '#9E9E9E'}
              />
            )}
            right={props => (
              <View style={styles.achievementReward}>
                <Text>{achievement.reward}</Text>
                {achievement.unlocked && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color="#4CAF50"
                  />
                )}
              </View>
            )}
            style={[
              styles.achievementItem,
              { opacity: achievement.unlocked ? 1 : 0.6 }
            ]}
          />
        ))}
      </View>

      {showTip && (
        <Adongo
          message="Level up your skills to unlock new opportunities! Each skill level gives you better results in that area. Try to balance your development! 🌟"
          onNext={() => setShowTip(false)}
          position="left"
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
  xpCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  xpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  xpIcon: {
    backgroundColor: '#FFD700',
  },
  xpInfo: {
    marginLeft: 16,
  },
  xpProgress: {
    height: 8,
    borderRadius: 4,
  },
  xpNeeded: {
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  skillCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillTitleContainer: {
    marginLeft: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  subSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  subSkillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 4,
  },
  subSkillText: {
    marginLeft: 4,
    color: '#666',
  },
  achievementItem: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  achievementReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default SkillsScreen;
