import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../contexts/ThemeContext';
import { Wand2, Scroll, Sparkles, ArrowLeft, Filter } from 'lucide-react';
import { Priority } from '../types/task';

interface MagicalAppProps {
  onBackToLanding: () => void;
}

export const MagicalApp: React.FC<MagicalAppProps> = ({ onBackToLanding }) => {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active': return !task.completed;
      case 'completed': return task.completed;
      default: return true;
    }
  });

  const taskCounts = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-parchment">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBackToLanding}
                variant="ghost"
                size="sm"
                className="font-parchment"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Entrance
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <Scroll className="h-6 w-6 text-primary" />
                <h1 className="font-magical text-2xl font-bold text-foreground">
                  Muggle Task
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Task Stats */}
              <div className="hidden sm:flex items-center gap-4 text-sm font-parchment text-muted-foreground">
                <span>{taskCounts.active} Active</span>
                <span>•</span>
                <span>{taskCounts.completed} Complete</span>
              </div>

              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="group bg-card/80 backdrop-blur-sm hover:bg-card border border-border/50"
              >
                <Wand2 className={`h-4 w-4 mr-2 transition-all duration-500 ${theme === 'lumos' ? 'wand-tip lumos' : ''}`} />
                <span className="font-magical text-sm">
                  {theme === 'lumos' ? 'Nox' : 'Lumos'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h2 className="font-magical text-3xl md:text-4xl font-bold text-foreground">
              Welcome to Your Task Manager
            </h2>
            <p className="font-parchment text-lg text-muted-foreground max-w-2xl mx-auto">
              Organize your tasks with magical efficiency. Each item becomes a commitment 
              to your future self, powered by productivity spells.
            </p>
          </div>

          {/* Task Form */}
          <TaskForm onAddTask={addTask} />

          {/* Filter Controls */}
          {tasks.length > 0 && (
            <Card className="parchment shadow-parchment border-border/50">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-accent" />
                    <span className="font-parchment text-sm font-semibold">Filter Tasks:</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {[
                      { key: 'all', label: 'All Tasks' },
                      { key: 'active', label: 'In Progress' },
                      { key: 'completed', label: 'Completed' }
                    ].map(({ key, label }) => (
                      <Button
                        key={key}
                        onClick={() => setFilter(key as any)}
                        variant={filter === key ? "default" : "outline"}
                        size="sm"
                        className="font-parchment text-xs"
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tasks List */}
          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-magical text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Your Tasks
                  <span className="text-sm text-muted-foreground font-parchment">
                    ({filteredTasks.length})
                  </span>
                </h3>
              </div>
              
              <div className="space-y-3">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="task-enter-active"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={toggleComplete}
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : tasks.length > 0 ? (
            <Card className="parchment shadow-parchment border-border/50">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="font-magical text-xl font-semibold text-foreground">
                    No {filter} tasks found
                  </h3>
                  <p className="font-parchment text-muted-foreground">
                    Try adjusting your filter or add a new task above.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="parchment shadow-parchment border-border/50">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="text-6xl magical-float">📜</div>
                  <h3 className="font-magical text-xl font-semibold text-foreground">
                    Your task list awaits your first entry
                  </h3>
                  <p className="font-parchment text-muted-foreground max-w-md mx-auto">
                    Start your productivity journey by adding your first task. 
                    What goals will you accomplish today?
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Magical Footer */}
      <div className="mt-16 py-8 text-center border-t border-border/30">
        <p className="font-parchment text-sm text-muted-foreground italic">
          "The secret of getting ahead is getting started. Break your complex goals into simple tasks."
        </p>
      </div>
    </div>
  );
};