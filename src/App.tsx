import React, { useState } from 'react';
import { BookmarkManager } from './components/bookmarks/BookmarkManager';
import { ContestArena } from './components/contests/ContestArena';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { ActiveNavTab, AppLayout } from './components/layout/AppLayout';
import { LearningHub } from './components/learning/LearningHub';
import { ProblemList } from './components/problems/ProblemList';
import { ProblemSolver } from './components/problems/ProblemSolver';
import { ProfileHub } from './components/profile/ProfileHub';
import { ProgressTracker } from './components/progress/ProgressTracker';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AlgorithmVisualizer, VisualizerAlgorithm } from './components/visualizer/AlgorithmVisualizer';
import { Problem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveNavTab>('dashboard');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [visualizerAlgorithm, setVisualizerAlgorithm] = useState<VisualizerAlgorithm>('BINARY_SEARCH');
  const [, setRoleRefreshKey] = useState<number>(0);

  const handleSelectProblem = (prob: Problem) => {
    setActiveProblem(prob);
  };

  const handleBackFromSolver = () => {
    setActiveProblem(null);
  };

  const handleOpenVisualizer = (algo?: VisualizerAlgorithm) => {
    if (algo) setVisualizerAlgorithm(algo);
    setActiveProblem(null);
    setCurrentTab('visualizer');
  };

  // If a problem is currently being solved, render ProblemSolver
  if (activeProblem) {
    return (
      <ProblemSolver
        problem={activeProblem}
        onBack={handleBackFromSolver}
      />
    );
  }

  return (
    <AppLayout
      currentTab={currentTab}
      onSelectTab={(tab) => {
        setCurrentTab(tab);
        setActiveProblem(null);
      }}
      onRoleChanged={() => setRoleRefreshKey((k) => k + 1)}
    >
      {currentTab === 'dashboard' && (
        <StudentDashboard
          onNavigate={(view) => {
            setCurrentTab(view as ActiveNavTab);
            setActiveProblem(null);
          }}
          onSelectProblem={handleSelectProblem}
        />
      )}

      {currentTab === 'learning' && (
        <LearningHub
          onOpenVisualizer={handleOpenVisualizer}
          onSelectProblem={handleSelectProblem}
        />
      )}

      {currentTab === 'problems' && (
        <ProblemList onSelectProblem={handleSelectProblem} />
      )}

      {currentTab === 'progress' && (
        <ProgressTracker
          onSelectProblem={handleSelectProblem}
          onNavigateToLearning={() => setCurrentTab('learning')}
          onNavigateToProblems={() => setCurrentTab('problems')}
          onNavigateToContests={() => setCurrentTab('contests')}
        />
      )}

      {currentTab === 'visualizer' && (
        <AlgorithmVisualizer
          initialAlgorithm={visualizerAlgorithm}
          onClose={() => setCurrentTab('dashboard')}
        />
      )}

      {currentTab === 'contests' && (
        <ContestArena onSelectProblem={handleSelectProblem} />
      )}

      {currentTab === 'bookmarks' && (
        <BookmarkManager
          onSelectProblem={handleSelectProblem}
          onNavigateToLearning={() => setCurrentTab('learning')}
        />
      )}

      {currentTab === 'profile' && (
        <ProfileHub
          onNavigateToProblems={() => setCurrentTab('problems')}
          onNavigateToProgress={() => setCurrentTab('progress')}
          onSelectProblem={handleSelectProblem}
        />
      )}

      {currentTab === 'teacher' && (
        <TeacherDashboard
          onProblemCreated={(newProb) => {
            handleSelectProblem(newProb);
          }}
        />
      )}
    </AppLayout>
  );
}
